import { Metadata } from 'next';
import Link from '../../../components/Links';
import TerminalCodePreview from '../../../components/TerminalCodePreview';
import coquiSample from '../../../components/assets/boops/natural-screen-reader-voice-on-linux/welcome_coqui.mp3';
import piperSample from '../../../components/assets/boops/natural-screen-reader-voice-on-linux/welcome_piper.mp3';
import { description, id, title } from './meta';

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
      <p>2023-06-07</p>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-xl">{description}</p>
      <hr className="mb-6" />
      {/* CONTENT */}
      <div className="bg-purple-100 py-24 text-black px-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-content-evenly">
        <div>
          <h3 className="text-xl font-bold">why?</h3>
          <br />
          <p>
            we recently wanted to read a book but are not very good at it. so we
            tried to setup a <b>screen reader</b> to do it for us. the default
            voices on linux are pretty bad so we tried to find better ones. this
            is the story.
          </p>
          <br />
          <p>
            we first tried coqui-ai and piper but coqui-ai was too slow to be
            usable, so we settled on <b>piper</b>.
          </p>
        </div>
        <div>
          <p>here is a coqui-ai voice sample</p>
          <p>
            <audio src={coquiSample} controls></audio>
          </p>
          <p>and here is a piper voice sample</p>
          <p>
            <audio src={piperSample} controls></audio>
          </p>
          <br />
          <p>
            note that this is <b>not in any way safe</b> to run as daily driver.
            it is not suitable if you rely on your text to speech to not break.
          </p>
        </div>
      </div>
      <div className="py-24 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-content-evenly">
        <div>
          <h3 className="text-xl font-bold">how?</h3>
          <br />
          <h4 className="text-lg font-bold">prerequisites and trying it out</h4>
          <br />
          <p>
            first we need text to speech tools on our system. usually having{' '}
            <code>espeak-ng orca</code> packages installed <b>should</b> be
            enough. they pull all the dependencies required and integrate with
            popular desktop environments.
          </p>
          <br />
          <p>
            next we want to{' '}
            <Link
              href="https://github.com/rhasspy/piper/releases/"
              isExternal
              className="text-base"
            >
              grab a release of piper and a voice for it
            </Link>
            . pick the <code>amd64</code> or <code>arm64</code> prebuilt
            binaries depending on your architecture and one of the voices. the
            initial release has the voice download links. we went with{' '}
            <code>en-us-amy-low</code>, because it was the first one in order.
          </p>
          <p>
            now extract the piper release anywhere you please, extract the voice
            in the same folder. you can put it anywhere but we just put it in
            the same folder.
          </p>
          <p>you are now done with the requirements part.</p>
          <br />
          <p>
            we will assume you also went with the voice en-us-amy-low to make
            commands that will come up <b>easier</b>. make sure to replace this
            with the actual voice you picked if different.
          </p>
        </div>
        <div>
          <p>
            you can test that <b>speech dispatcher</b> is working with all the
            defaults by running :
          </p>
          <TerminalCodePreview lang="language-bash">
            spd-say &quot;it&apos;s that shrimple&quot;
          </TerminalCodePreview>
          <p>ideally you get some audio output (with a terrible voice).</p>
          <p>
            you can test piper by going into the folder where you put everything
            and :
          </p>
          <TerminalCodePreview lang="language-bash">
            {`echo "it's that shrimple" \\
| ./piper --model en-us-amy-low.onnx --output_file - \\
| paplay`}
          </TerminalCodePreview>
          <p>
            output file with a dash tells it to output raw audio to stdout and
            we pipe (<code>|</code>) that into in paplay. paplay is the
            pulseaudio version of aplay (alsa play), meaning it should work on
            most distributions, even if on pipewire.
          </p>
        </div>
      </div>
      <div className="bg-orange-100 py-24 text-black px-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-content-evenly">
        <div>
          <h4 className="text-lg font-bold">system configuration</h4>
          <br />
          <p>
            if the commands ran fine you are now ready to configure everything.
            so the next step is to create a new <b>module</b> for
            speech-dispatcher. so we create a new file and edit it :
          </p>
          <TerminalCodePreview lang="language-bash" noBG={true}>
            {`sudo touch /etc/speech-dispatcher/modules/piper-generic.conf
sudo $EDITOR /etc/speech-dispatcher/modules/piper-generic.conf`}
          </TerminalCodePreview>
          <p>we then add these two lines :</p>
          <TerminalCodePreview lang="language-ini" noBG={true}>
            {`GenericExecuteSynth "echo \'$DATA\' | /home/user/Documents/piper/piper --model /home/user/Documents/piper/en-us-amy-low.onnx --output_raw | $PLAY_COMMAND"
AddVoice "en" "FEMALE1" "en_UK/apope_low"`}
          </TerminalCodePreview>
          <p>
            the first line is the piper test command we made you run earlier but
            with variables instead of hardcoded values. <code>$DATA</code> is
            handled by speech dispatcher and <code>$PLAY_COMMAND</code> should
            just default to aplay or paplay on most systems.
          </p>
          <br />
          <p>
            the things you care about are the <b>full paths</b> to the piper
            executable as well as the full path to the voice model that you
            extracted earlier. make sure to replace those.
          </p>
          <br />
          <p>
            the second line is because of how speech dispatcher is made to
            handle a quantity of different <b>voices</b> so we tell it to add a
            new one so we can later select it.
          </p>
          <br />
          <p>save the file and exit.</p>
        </div>
        <div>
          <p>
            you can probably (maybe after a reboot or a logout) already just use
            a graphical interface like <code>orca --setup</code> to select{' '}
            <b>piper-generic</b> as speech engine <b>module</b> and the{' '}
            <b>voice</b> we added.
          </p>
          <br />
          <p>
            another way is to set the default settings for speech-dispatcher{' '}
            <b>system wide</b> to automatically use the new module and voice.
            you want to edit :
          </p>
          <TerminalCodePreview lang="language-bash" noBG={true}>
            sudo $EDITOR /etc/speech-dispatcher/speechd.conf
          </TerminalCodePreview>
          <p>add the 3 following lines at the end of the file :</p>
          <TerminalCodePreview lang="language-ini" noBG={true}>
            {`DefaultVoiceType  "FEMALE1"
DefaultLanguage "en"
DefaultModule piper-generic`}
          </TerminalCodePreview>
          <p>
            if you edited any of the <b>voice names</b> in the previous module
            file on the second line for the voice then make sure to adjust
            accordingly.
          </p>
          <br />
          <p>save the file and exit.</p>
        </div>
        <br />
      </div>
      <div className="py-24 px-4 grid grid-cols-1 md:grid-cols-2 gap-4 place-content-evenly">
        <div>
          <h4 className="text-lg font-bold">trying it out and wrapping up</h4>
          <br />
          <p>
            that&apos;s pretty much it. hopefully. if all of the various bricks
            that make up linux decided to cooperate.
          </p>
          <br />
          <p>
            you can now try running the <code>spd-say</code> command again :
          </p>
          <TerminalCodePreview lang="language-bash">
            spd-say &quot;it&apos;s that shrimple&quot;
          </TerminalCodePreview>
          <p>
            meaning now anything that <b>integrates</b> with speech-dispatcher
            (which is a bunch of stuff on linux actually so that&#39;s nice)
            like <b>firefox, calibre reader, or even system wide</b> will use
            the new piper module we just configured.
          </p>
          <br />
          <p>finally no more Microsoft Sam voice.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">what next?</h3>
          <br />
          <p>
            to actually make this properly usable system wide and better
            there&#39;s some stuff we still need to figure out such as :
          </p>
          <br />
          <ul className="list-disc">
            <li>adjusting diction speed</li>
            <li>making this setup more reliable</li>
            <li>
              packaging this as some sort of speech-dispatcher package that can
              just be installed with a package manager
            </li>
          </ul>
          <br />
          <p>and more generally adding more polish to this post.</p>
          <br />
          <p>
            anyways <b>thank you</b> for your time reading this we hope some of
            the knowledge in here can be of use to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Boop;
