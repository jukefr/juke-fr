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
} from '@chakra-ui/react';
import Head from 'next/head';
import TerminalCodePreview from '../../components/TerminalCodePreview';

export const title = 'more natural screen reader voice on linux';
export const description =
  'using piper for a more natural sounding voice with speech-dispatcher';
export const id = 'natural-screen-reader-voice-on-linux';

const Boop = (): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  return (
    <Container maxW="container.xl">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="meta-description" />
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
      <Box my={16}>
        <Heading as="h3" size="lg">
          why
        </Heading>
        <SimpleGrid columns={[1, null, 2]} spacing={6}>
          <Box>
            <Text>
              recently wanted to read a book but not very good at it. so tried
              to setup a screen reader to do it. the default voices on linux are
              pretty bad so we tried to find better ones.
            </Text>
            <Text>
              we tried coqui-ai and piper but coqui-ai was too slow to be
              usable.
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
            <Text>
              note that this is not in any way safe to run as daily driver. it
              is not suitable if you rely on your text to speech to not break.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
      <Box my={16}>
        <Heading as="h3" size="lg">
          how
        </Heading>
        <Heading as="h4" size="md">
          prerequisites
        </Heading>
        <Text>
          usually having <Code>espeak-ng orca</Code> packages installed should
          be enough. they pull all the dependencies reqired and integrate with
          environments.
        </Text>
        <Text>
          next we want to grab a release of piper so head over to{' '}
          <a href="https://github.com/rhasspy/piper/releases/">
            https://github.com/rhasspy/piper/releases/
          </a>{' '}
          and simply grab the <Code>amd64</Code> or <Code>arm64</Code> prebuilt
          binaries depending on your architecture and one of the voices (i went
          with <Code>en-us-amy-low</Code>, mainly because it was the first one
          in order lol)
        </Text>
        <Text>
          now extract the piper release anywhere you please, extract the voice
          in the same folder (you can put it anywhere really but i just put it
          in the same folder)
        </Text>
        <Text>and youre pretty much all done for the requirements part</Text>
        <Text>
          i will assume you also went with the voice en-us-amy-low to make
          commands that will come up easier, but make sure to replace this with
          the actual voice you picked if different
        </Text>
        <Text>
          you can test that speech dispatcher is working with all the defaults
          for now by running
        </Text>
        <TerminalCodePreview lang="language-bash">
          spd-say &quot;Hello world this is a test sentence&quot;
        </TerminalCodePreview>
        <Text>
          and ideally you get some audio output (but for now with a terrible
          default voice), if not i&#39;m sorry but i blame foss devs for their
          support of accessibility features
        </Text>
        <Text>and you can test piper by going into the folder and running</Text>
        <TerminalCodePreview lang="language-bash">
          echo &quot;Hello world this is a test sentence&quot; | ./piper --model
          en-us-amy-low.onnx --output_file - | paplay
        </TerminalCodePreview>
        <Text>
          the output file with a dash simply tells it to output to stdout and we
          pipe it directly in paplay which is just the pulseaudio version of
          aplay (alsa play), meaning it just works fine on most distributions,
          even if you use pipewire so thats that
        </Text>
        <Text>
          if both of these commands ran fine youre already 80% of the way there
          and we just need to create a little configuration file and set some
          default config values (but you could also just use the kde
          accessibility settings panel or orca settings to actually set these
          values, it should work the same)
        </Text>
        <Text>
          so the next step is to create a new module for speech-dispatcher
        </Text>
        <SimpleGrid columns={[1, null, 2]} spacing={6}>
          <Box>
            <Text>
              so we will be creating a new file{' '}
              <Code>/etc/speech-dispatcher/modules/piper-generic.conf</Code>
            </Text>
            <TerminalCodePreview lang="language-bash" noBG={true}>
              sudo touch /etc/speech-dispatcher/modules/piper-generic.conf
            </TerminalCodePreview>
          </Box>
          <Box>
            <Text>and edit it and fill it with these two following lines</Text>
            <TerminalCodePreview lang="language-bash" noBG={true}>
              sudo $EDITOR /etc/speech-dispatcher/modules/piper-generic.conf
            </TerminalCodePreview>
          </Box>
        </SimpleGrid>
        <Text>and these are the two lines</Text>
        <TerminalCodePreview lang="language-ini">
          {`GenericExecuteSynth "echo \'$DATA\' | /home/user/Documents/piper/piper --model /home/user/Documents/piper/en-us-amy-low.onnx --output_raw | $PLAY_COMMAND"
AddVoice "en" "FEMALE1" "en_UK/apope_low"`}
        </TerminalCodePreview>
        <Text>
          so the first line is pretty much the piper one i made you run earlier
          but with variables instead of harcoded values, <Code>$DATA</Code> is
          handled by speech dispatcher and <Code>$PLAY_COMMAND</Code> should
          just default to aplay or paplay on most systems
        </Text>
        <Text>
          the things you care about are mainly the actual <Code>realpath</Code>{' '}
          (so the full path) to the piper executable as well as the full path to
          the voice model
        </Text>
        <Text>
          the second line is just because of how speech dispatcher is made to
          handle a quantity of different voices so we tell it to add a new one
          so we can later select it in the options for it to be happy but none
          of the actual values in this line <strong>actually</strong> matter in
          any way as long as you can just write the same ones in the config file
          later
        </Text>
        <Text>save the file, exit and you&#39;re 95% there now</Text>
        <Text>
          you can probably (maybe after a reboot) already just use a gui like
          orca settings now to select piper-generic as speech engine and the
          default voice should automatically be the one we just added
        </Text>
        <SimpleGrid columns={[1, null, 2]} spacing={6}>
          <Box>
            <Text>
              but in case here is how to also set the default settings for
              speech-dispatcher to use the new module we just added
            </Text>
            <Text>
              you want to edit <Code>/etc/speech-dispatcher/speechd.conf</Code>{' '}
              so
            </Text>
            <TerminalCodePreview lang="language-bash" noBG={true}>
              sudo $EDITOR /etc/speech-dispatcher/speechd.conf
            </TerminalCodePreview>
          </Box>
          <Box>
            <Text>
              and you can either search for the commented lines i&#39;m about to
              give you and uncomment them and edit them manually or just add the
              3 following lines at the end of the file, same thing
            </Text>
            <TerminalCodePreview lang="language-ini" noBG={true}>
              {`DefaultVoiceType  "FEMALE1"
DefaultLanguage "en"
DefaultModule piper-generic`}
            </TerminalCodePreview>
          </Box>
        </SimpleGrid>
        <Text>
          if you edited any of the names in the previous module file on the
          second line for the voice then make sure to adjust accordingly
        </Text>
        <Text>
          but yeah thats pretty much it, save the file and exit and you&#39;re
          done
        </Text>
        <Text>
          you can now try running the <Code>spd-say</Code> command again and it
          should just work
        </Text>
        <TerminalCodePreview lang="language-bash">
          spd-say &quot;Hello world this is a test sentence&quot;
        </TerminalCodePreview>
        <Text>
          meaning that now anything that integrates with speech-dispatcher
          (which is a bunch of stuff on linux actually so that&#39;s nice) like
          firefox, calibre reader, or even system wide use will use the new
          piper module we just configured
        </Text>
        <Text>finally no more 1998 Fossoft Sam voice, enjoy</Text>
      </Box>
      <Box my={16}>
        <Heading as="h3" size="lg">
          what next
        </Heading>
        <Text>
          to actually make this properly usable system wide and better
          there&#39;s some stuff i still need to figure out such as adjusting
          diction speed and whatnot
        </Text>
      </Box>
    </Container>
  );
};

export default Boop;
