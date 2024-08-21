import { Metadata } from 'next';
import Link from '../../../components/Links';
import TerminalCodePreview from '../../../components/TerminalCodePreview';
import { description, title } from './meta';

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    title,
    description,
  },
  openGraph: {
    title,
    description,
  },
};

const Boop = (): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  return (
    <div className="boop  px-4 md:container md:mx-auto">
      {/* WIP SENTENCE */}
      <div className="grid place-content-center">
        <p className="bg-orange-100 mb-2 text-black inline-block px-2">
          {wipSentence}
        </p>
      </div>
      {/* HEADER */}
      <p>2024-07-21</p>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-xl">{description}</p>
      <hr className="mb-6" />
      {/* CONTENT */}
      <div className="bg-green-100 py-24 text-black px-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-content-evenly">
        <h3 className="text-xl font-bold">why?</h3>
        <br />
        <p>i recently switched all my machines to nix and nixos. this includes my desktop computer, my laptop, my vps and my phone (nix-on-droid)</p>
        <p>i wanted to setup a vpn so that any of them could access any other without any issues, and headscale seems to be popular these days so i gave it a try</p>
      </div>

      <div className="py-24 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-content-evenly">
        <div>
          <h3 className="text-xl font-bold">how?</h3>
          <br />
          <h4 className="text-lg font-bold">prerequisites</h4>
          <br />
          <p>1. the first thing you need is a domain, i used headscale.juke.fr, make sure you setup an A record that points to the host that will host the headscale server</p>
          <br />
          <p>you can also use a dynamic dns service but setting one of these up is not covered in this guide but if you go that route you might want to look into <b>ddclient</b></p>
          <br />
        </div>
        <div>
          <p>2. then you need to make sure that <b>80/TCP, 443/TCP and 3478/UDP</b> are all allowed in your firewall (for nixos this is covered later in this guide, but if you are running on a VPS like i am on oracle you might need to also open them elsewhere)</p>
        </div>
      </div>

      <div className="bg-orange-100 py-24 text-black px-4 grid grid-cols-1 gap-4 place-content-evenly">
        <h3 className="text-xl font-bold">headscale nixos configuration</h3>
        <br />
        <p>create a <code>headscale.nix</code> module that you import in your nixos configuration that contains the following, adjust accoring to your needs</p>
        <TerminalCodePreview lang="language-nix" noBG={true}>
          {`
{
  config,
  ...
}:
let
  domain = "juke.fr"; # domain to use
  derpPort = 3478; # default derp port
in
{
  services = {
    # enable headscale service and configure
    headscale = {
      enable = true;
      address = "127.0.0.1";
      port = 8085; # use any port you please, it gets reversed tunnelled anyways
      settings = {
        dns_config = {
          override_local_dns = true;
          base_domain = domain;
          magic_dns = true; # this enables you to access hosts via $HOSTNAME.$USER.juke.fr
          domains = [ "hs.\${domain}" ];
          nameservers = [
            "1.1.1.1"
            "9.9.9.9"
          ];
        };
        server_url = "https://headscale.\${domain}";
        metrics_listen_addr = "127.0.0.1:8095"; # use any port you please, it gets reversed tunnelled anyways
        logtail = {
          enabled = false;
        };
        log = {
          level = "warn";
        };
        derp.server = {
          enable = true;
          region_id = 999;
          stun_listen_addr = "0.0.0.0:\${toString derpPort}";
        };
      };
    };

    # reverse proxy with ssl
    nginx = {
      enable = true;
      virtualHosts."headscale.\${domain}" = {
        forceSSL = true;
        enableACME = true;
        locations = {
          "/" = {
            proxyPass = "http://localhost:\${toString config.services.headscale.port}";
            proxyWebsockets = true;
          };
          "/metrics" = {
            proxyPass = "http://\${config.services.headscale.settings.metrics_listen_addr}/metrics";
          };
        };
      };
    };
  };

  # configure ssl certificate options
  security.acme = {
    defaults.email = "acme@juke.fr";
    acceptTerms = true;
  };

  # punch through firewall
  networking.firewall.allowedUDPPorts = [ derpPort ];
  networking.firewall.allowedTCPPorts = [
    80
    443
  ];

  # add headscale package to system
  environment.systemPackages = [ config.services.headscale.package ];
}
            `}
        </TerminalCodePreview>
        <br />
        <p>switch nixos configurations and make sure everything is working correctly by accessing <code>headscale.juke.fr/metrics</code></p>
        <p>you also need to create a namespace (which will create a user) for use later on</p>
        <TerminalCodePreview lang="language-bash" noBG={true}>
          sudo headscale namespaces create net # replace net with the namespace name you want
        </TerminalCodePreview>
      </div>

      <div className="py-24 px-4 grid grid-cols-1 gap-4 place-content-evenly">

        <h3 className="text-xl font-bold">tailscale nixos configuration</h3>
        <br />
        <p>next we want to setup the tailscale service in <code>tailscale.nix</code> and import it in our common configuration for everybody to use</p>

        <TerminalCodePreview lang="language-nix">
          {`
{
  lib,
  ...
}:
{
  services.tailscale = {
    enable = true;
    useRoutingFeatures = lib.mkDefault "client";
  };
  networking.firewall = {
    checkReversePath = "loose";
    allowedUDPPorts = [ 41641 ]; # Facilitate firewall punching
  };
}

            `}
        </TerminalCodePreview>
        <p>rebuild nixos and now to join the headscale instance we can use</p>
        <TerminalCodePreview lang="language-bash">
          sudo tailscale up --login-server https://headscale.juke.fr/
        </TerminalCodePreview>
        <p>this will direct you to a login page that will generate a command you should type on the headscale server replacing <code>$USER</code> with the namespace we created earlier, don't forget to add sudo also</p>
        <br />
        <p>your client is now connected to headscale and you can access it with <code>$HOSTNAME.$NAMESPACE.$domain</code> for example <code>nixos-home.net.juke.fr</code></p>

      </div>
    </div>
  );
};

export default Boop;
