import {
  Container,
  Divider,
  Heading,
  Highlight,
  Text,
  Code,
  Box,
  Grid,
  GridItem,
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

export const title = 'more natural screen reader voice on linux';
export const description =
  'using piper for a more natural sounding voice with speech-dispatcher';
export const id = 'natural-screen-reader-voice-on-linux';

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
        <Text>2023-06-07</Text>
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        <Text fontSize="xl">{description}</Text>
        <Divider mb={6} />
      </Container>
      <Box bg="yellow.100" py={24} color="black">
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
                    we recently wanted to read a book but are not very good at
                    it. so we tried to setup a <b>screen reader</b> to do it for
                    us. the default voices on linux are pretty bad so we tried
                    to find better ones. this is the story.
                  </Text>
                  <br />
                  <Text>
                    we first tried coqui-ai and piper but coqui-ai was too slow
                    to be usable, so we settled on <b>piper</b>.
                  </Text>
                </Box>
                <Box>
                  <Text>here is a coqui-ai voice sample</Text>
                  <Text>
                    <audio src="/welcome_coqui.mp3" controls></audio>
                  </Text>
                  <Text>and here is a piper voice sample</Text>
                  <Text>
                    <audio src="/welcome_piper.mp3" controls></audio>
                  </Text>
                  <br />
                  <Text>
                    note that this is <b>not in any way safe</b> to run as daily
                    driver. it is not suitable if you rely on your text to
                    speech to not break.
                  </Text>
                </Box>
              </SimpleGrid>
            </LightMode>
          </Box>
        </Container>
      </Box>
      <Container maxW="container.xl">
        <Box my={24}>
          <SimpleGrid columns={[1, null, 2]} spacing={6}>
            <Box>
              <Heading as="h3" size="lg">
                how
              </Heading>
              <Heading as="h4" size="md">
                prerequisites and trying it out
              </Heading>
              <br />
              <Text>
                first we need text to speech tools on our system. usually having{' '}
                <Code>espeak-ng orca</Code> packages installed <b>should</b> be
                enough. they pull all the dependencies required and integrate
                with popular desktop environments.
              </Text>
              <br />
              <Text>
                next we want to{' '}
                <Link
                  href="https://github.com/rhasspy/piper/releases/"
                  isExternal
                  color={useColorModeValue('blue.500', 'blue.200')}
                >
                  grab a release of piper and a voice for it{' '}
                  <ExternalLinkIcon mx="2px" />
                </Link>
                . pick the <Code>amd64</Code> or <Code>arm64</Code> prebuilt
                binaries depending on your architecture and one of the voices.
                the initial release has the voice download links. we went with{' '}
                <Code>en-us-amy-low</Code>, because it was the first one in
                order.
              </Text>
              <Text>
                now extract the piper release anywhere you please, extract the
                voice in the same folder. you can put it anywhere but we just
                put it in the same folder.
              </Text>
              <Text>you are now done with the requirements part.</Text>
              <br />
              <Text>
                we will assume you also went with the voice en-us-amy-low to
                make commands that will come up <b>easier</b>. make sure to
                replace this with the actual voice you picked if different.
              </Text>
            </Box>
            <Box>
              <Text>
                you can test that <b>speech dispatcher</b> is working with all
                the defaults by running :
              </Text>
              <TerminalCodePreview lang="language-bash">
                spd-say &quot;it&apos;s that shrimple&quot;
              </TerminalCodePreview>
              <Text>
                ideally you get some audio output (with a terrible voice).
              </Text>
              <Text>
                you can test piper by going into the folder where you put
                everything and :
              </Text>
              <TerminalCodePreview lang="language-bash">
                {`echo "it's that shrimple" \\
| ./piper --model en-us-amy-low.onnx --output_file - \\
| paplay`}
              </TerminalCodePreview>
              <Text>
                output file with a dash tells it to output raw audio to stdout
                and we pipe (<Code>|</Code>) that into in paplay. paplay is the
                pulseaudio version of aplay (alsa play), meaning it should work
                on most distributions, even if on pipewire.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
      <br />
      <Box bg="orange.100" py={24} color="black">
        <Container maxW="container.xl">
          <Box>
            <LightMode>
              <SimpleGrid columns={[1, null, 2]} spacing={6}>
                <Box>
                  <Heading as="h4" size="md">
                    system configuration
                  </Heading>
                  <br />
                  <Text>
                    if the commands ran fine you are now ready to configure
                    everything. so the next step is to create a new{' '}
                    <b>module</b> for speech-dispatcher. so we create a new file
                    and edit it :
                  </Text>
                  <TerminalCodePreview lang="language-bash" noBG={true}>
                    {`sudo touch /etc/speech-dispatcher/modules/piper-generic.conf
sudo $EDITOR /etc/speech-dispatcher/modules/piper-generic.conf`}
                  </TerminalCodePreview>
                  <Text>we then add these two lines :</Text>
                  <TerminalCodePreview lang="language-ini" noBG={true}>
                    {`GenericExecuteSynth "echo \'$DATA\' | /home/user/Documents/piper/piper --model /home/user/Documents/piper/en-us-amy-low.onnx --output_raw | $PLAY_COMMAND"
AddVoice "en" "FEMALE1" "en_UK/apope_low"`}
                  </TerminalCodePreview>
                  <Text>
                    the first line is the piper test command we made you run
                    earlier but with variables instead of hardcoded values.{' '}
                    <Code>$DATA</Code> is handled by speech dispatcher and{' '}
                    <Code>$PLAY_COMMAND</Code> should just default to aplay or
                    paplay on most systems.
                  </Text>
                  <br />
                  <Text>
                    the things you care about are the <b>full paths</b> to the
                    piper executable as well as the full path to the voice model
                    that you extracted earlier. make sure to replace those.
                  </Text>
                  <br />
                  <Text>
                    the second line is because of how speech dispatcher is made
                    to handle a quantity of different <b>voices</b> so we tell
                    it to add a new one so we can later select it.
                  </Text>
                  <br />
                  <Text>save the file and exit.</Text>
                </Box>
                <Box>
                  <Text>
                    you can probably (maybe after a reboot or a logout) already
                    just use a graphical interface like{' '}
                    <Code>orca --setup</Code> to select <b>piper-generic</b> as
                    speech engine <b>module</b> and the <b>voice</b> we added.
                  </Text>
                  <br />
                  <Text>
                    another way is to set the default settings for
                    speech-dispatcher <b>system wide</b> to automatically use
                    the new module and voice. you want to edit :
                  </Text>
                  <TerminalCodePreview lang="language-bash" noBG={true}>
                    sudo $EDITOR /etc/speech-dispatcher/speechd.conf
                  </TerminalCodePreview>
                  <Text>
                    add the 3 following lines at the end of the file :
                  </Text>
                  <TerminalCodePreview lang="language-ini" noBG={true}>
                    {`DefaultVoiceType  "FEMALE1"
DefaultLanguage "en"
DefaultModule piper-generic`}
                  </TerminalCodePreview>
                  <Text>
                    if you edited any of the <b>voice names</b> in the previous
                    module file on the second line for the voice then make sure
                    to adjust accordingly.
                  </Text>
                  <br />
                  <Text>save the file and exit.</Text>
                </Box>
              </SimpleGrid>
            </LightMode>
            <br />
          </Box>
        </Container>
      </Box>
      <Container maxW="container.xl">
        <Box my={24}>
          <SimpleGrid columns={[1, null, 2]} spacing={6}>
            <Box>
              <Heading as="h4" size="md">
                trying it out and wrapping up
              </Heading>
              <br />
              <Text>
                that&apos;s pretty much it. hopefully. if all of the various
                bricks that make up linux decided to cooperate.
              </Text>
              <br />
              <Text>
                you can now try running the <Code>spd-say</Code> command again :
              </Text>
              <TerminalCodePreview lang="language-bash">
                spd-say &quot;it&apos;s that shrimple&quot;
              </TerminalCodePreview>
              <Text>
                meaning now anything that <b>integrates</b> with
                speech-dispatcher (which is a bunch of stuff on linux actually
                so that&#39;s nice) like{' '}
                <b>firefox, calibre reader, or even system wide</b> will use the
                new piper module we just configured.
              </Text>
              <br />
              <Text>finally no more Microsoft Sam voice.</Text>
            </Box>
            <Box>
              <Heading as="h3" size="lg">
                what next
              </Heading>
              <br />
              <Text>
                to actually make this properly usable system wide and better
                there&#39;s some stuff we still need to figure out such as :
              </Text>
              <br />
              <UnorderedList>
                <ListItem>adjusting diction speed</ListItem>
                <ListItem>making this setup more reliable</ListItem>
                <ListItem>
                  packaging this as some sort of speech-dispatcher package that
                  can just be installed with a package manager
                </ListItem>
              </UnorderedList>
              <br />
              <Text>and more generally adding more polish to this post.</Text>
              <br />
              <Text>
                anyways <b>thank you</b> for your time reading this we hope some
                of the knowledge in here can be of use to you.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};

export default Boop;
