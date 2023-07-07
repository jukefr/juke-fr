import {
  Container,
  Divider,
  Heading,
  Highlight,
  Text,
  Code,
  Box,
  SimpleGrid,
  useColorModeValue,
  Link,
  LightMode,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import Head from 'next/head';
import TerminalCodePreview from '../../components/TerminalCodePreview';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const title = 'better privacy when browsing online';
export const description =
  'various tips on privacy etiquette when browsing the modern web';
export const id = 'better-privacy-when-browsing-online';

const Boop = (): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  return (
    <>
      <Container maxW="container.xl">
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={description}
            key="meta-description"
          />
          <meta property="og:title" content={title} key="meta-og-title" />
          <meta
            property="og:description"
            content={description}
            key="meta-og-description"
          />
          <meta property="og:type" content="website" key="meta-og-type" />
          <meta
            property="og:url"
            content={`https://juke.fr/boops/${id}.html`}
            key="meta-og-url"
          />
          <meta
            property="og:image"
            content="https://juke.fr/og.png"
            key="meta-og-image"
          />
          <meta
            property="twitter:card"
            content="summary_large_image"
            key="meta-twitter-card"
          />
          <meta
            property="twitter:url"
            content={`https://juke.fr/boops/${id}.html`}
            key="meta-twitter-url"
          />
          <meta
            property="twitter:domain"
            content="juke.fr"
            key="meta-twitter-domain"
          />
          <meta
            property="twitter:title"
            content={title}
            key="meta-twitter-title"
          />
          <meta
            property="twitter:description"
            content={description}
            key="meta-twitter-description"
          />
          <meta
            property="twitter:image"
            content="https://juke.fr/og.png"
            key="meta-twitter-image"
          />
        </Head>
        <Text align="center" mb={2}>
          <Highlight
            query={wipSentence}
            styles={{
              px: '1',
              py: '1',
              bg: 'orange.100',
              whiteSpace: 'initial',
            }}
          >
            {wipSentence}
          </Highlight>
        </Text>
        <Text>2023-07-01</Text>
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        <Text fontSize="xl">{description}</Text>
        <Divider mb={6} />
      </Container>
      <Box bg="green.100" py={24} color="black">
        <Container maxW="container.xl">
          <Box>
            <LightMode>
              <SimpleGrid columns={[1, null, 2]} spacing={6}>
                <Box>
                  <Heading as="h3" size="lg">
                    why
                  </Heading>
                  <br />
                  <Text>
                    whether your entire existence is predicated by laws
                    surrounding your identity or you do not wish to be traded as
                    a commodity by data brokers to advertisers, there is no
                    denying that the modern web is a privacy nightmare.
                  </Text>
                </Box>
                <Box>
                  <Text>
                    this article will guide you through the various steps most
                    should be able to take to help mitigate some of the
                    dystopian aspects of the modern web.
                  </Text>
                  <br />
                  <Text>
                    we will go through various aspects, ad blocking, tracker
                    blocking, fingerprinting resistance and more.
                  </Text>
                </Box>
              </SimpleGrid>
            </LightMode>
          </Box>
        </Container>
      </Box>
      <Box py={24}>
        <LightMode>
          <Container maxW="container.xl">
            <SimpleGrid columns={[1, null, 2]} spacing={6}>
              <Box>
                <Heading as="h3" size="lg">
                  what we are up against
                </Heading>
                <br />
                <Heading as="h4" size="md">
                  fingerprinting
                </Heading>
                <br />
                <Text>
                  fingerprinting is a technique used to identify a user based on
                  their browser configuration. it is used to track users across
                  websites and sessions.
                </Text>
                <br />
                <Text>
                  most browsers by default will make information like your user
                  agent, screen resolution, timezone, language, installed fonts
                  and more available to websites. this information can be used
                  to create a unique fingerprint for you.
                </Text>
                <br />
                <Text>
                  this fingerprint is then used to track you across websites by
                  various third parties. effectively tying your identity to your
                  browser.
                </Text>
                <br />
                <Heading as="h4" size="md">
                  trackers
                </Heading>
                <br />
                <Text>
                  trackers are various things that get loaded when you visit a
                  website. they can be used to track you across websites and
                  sessions too.
                </Text>
                <br />
                <Text>
                  these are different from fingerprinting in that they are
                  usually loaded from third party domains and are not generated
                  from your browser.
                </Text>
                <br />
                <Heading as="h5" size="sm">
                  tracker examples
                </Heading>
                <br />
                <Text>
                  an email tracking pixel, a small image that (usually one
                  transparent pixel) that is loaded from a third party domain.
                  when your computer makes the request to load this image, the
                  third party domain can log your ip address, user agent, the
                  date, the amount of times you opened that email, etc.
                </Text>
                <br />
                <Text>
                  a website javascript file can be loaded when you visit a page,
                  it is usually used to add interactivity to the page like
                  animations, fetching data from somewhere else to display etc.
                  it can also be used to track a range of things from time spend
                  on the page, where your mouse cursor was during your visit,
                  what you clicked on, if you are even still on the page or
                  tabbed out, etc.
                </Text>
                <br />
                <Text>
                  a website cookie is generally used to store stuff that they
                  should be able to remember when you close your browser and
                  come back later. things like your shopping cart, your login
                  session, your preferences, etc.
                </Text>
                <Text>
                  however cookies can also be used to track you across different
                  domains from the same party. thing of google for example :
                  they have a lot of different services, gmail, youtube, the
                  search engine, etc. they can use cookies to track you across
                  all of these services while being certain of your identity (as
                  opposed to only browser fingerprinting which could be a false
                  positive).
                </Text>
              </Box>
              <Box>
                <Text>
                  it is also possible for third parties on a website to create
                  their own &quote;cross-site&quote; cookies and track you
                  across different websites. if you open a website that has a
                  facebook like button, facebook will be able to track you
                  across all websites that have a facebook like button.
                </Text>
                <br />
                <Text>
                  the advertising and online spying industry has gotten very
                  creative with tracking users across the web and there are many
                  more techniques that can be used to track you. but this should
                  give you an idea of the major ones.
                </Text>
                <br />
                <Heading as="h4" size="md">
                  dns and snooping
                </Heading>
                <br />
                <Text>
                  dns is the system that translates a domain name like
                  example.com to an ip address like 192.168.123.123. this is how
                  your computer knows where to send the request when you visit a
                  website.
                </Text>
                <br />
                <Text>
                  the problem is that your dns requests are usually sent to your
                  isp&apos;s (internet service provider) dns server. this means
                  that your isp (therefor it is safe to assume governments at
                  the very least) could know every website you visit.
                </Text>
                <br />
                <Text>
                  snooping is when a third party can see the contents of your
                  traffic. this is usually done by your isp or governments. this
                  has gotten a bit better with the advent of https making the
                  connection between you and the service encrypted. however if
                  you access any resource online with your home network
                  connection you are at the very least tying your ip address to
                  that visit. and this can again in conjunction with a simple
                  governmental endorsed backdoor to your isp (or a subpoena) be
                  used to identify you.
                </Text>
                <br />

                <Heading as="h4" size="md">
                  profiles
                </Heading>
                <br />
                <Text>
                  using these various techniques, advertisers, data brokers,
                  governments, etc. can create a profile of you. a single point
                  of data like a fingerprint is not much. but when you combine
                  it with all the other data points they have on you, they can
                  create a very detailed profile of you.
                </Text>
                <br />
                <Text>
                  this is how you get to a stage where companies like facebook
                  can predict your political affiliation, sexual orientation,
                  start showing you diaper ads before you even know you are
                  pregnant, etc. where governments are able to track your
                  movements, your political affiliations, your sexual
                  orientation, your gender identity, your friends, etc.
                </Text>
                <br />
                <Text>
                  and so now that you know all of the wonders of the modern
                  capitalistic web we are going to cover how we can fight
                  against all this.
                </Text>
              </Box>
            </SimpleGrid>
          </Container>
        </LightMode>
      </Box>
    </>
  );
};

export default Boop;
