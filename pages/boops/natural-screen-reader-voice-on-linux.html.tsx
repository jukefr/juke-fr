import { Container, Divider, Heading, Highlight, Text } from '@chakra-ui/react';
import Head from 'next/head';

export const title = 'more natural screen reader voice on linux';
export const description =
  'using piper for a more natural sounding voice with speech-dispatcher';
export const id = 'natural-screen-reader-voice-on-linux';

const Boop = (): JSX.Element => {
  const wipSentence = 'this post is still a work in progress';

  return (
    <Container maxW="container.md">
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
      <Heading as="h2">{title}</Heading>
      <Text fontSize="xl">{description}</Text>
      <Divider mb={6} />
      <Heading as="h3" id="the-why">
        the why
      </Heading>
      <Text>
        recently i wanted to read a book but i&#39;m not very good at it
      </Text>
      <Text>
        so i figured i would get a screen reader to do it for me while i read
        along to help
      </Text>
      <Text>regretfully i have brainrot and use linux as a daily driver</Text>
      <Text>
        so the natural thing everybody will tell you to do is use a combination
        of orca, espeak-ng and speech-dispatcher (actually have no clue what two
        third of these do but seems like they&#39;re need for proper system-wide
        integration)
      </Text>
      <Text>
        however i was soon disanchented as i realized the voices that came with
        it sound like Microsoft Sam&#39;s 1998 release (we love foss)
      </Text>
      <Text>
        so anyways cue a couple hours of me trying to find &quot;out of the
        box&quot; better voices for all of this setup
      </Text>
      <Text>
        tried festival voices, festival hts voices (whatever these are but
        random internet person said it was &quot;better&quot;) and whatever i
        could find on the aur
      </Text>
      <Text>all Microsoft Sam tier to be honest</Text>
      <Text>
        but i knew better stuff was out there even if maybe not packaged nicely
        already to work with all of these system integrations, that use the
        magic &quot;Artificial Intelligences&quot;
      </Text>
      <Text>
        so anyways first quick google brought me to an coqui-ai issue of
        somebody that was trying to get it to work with speech-dispatcher
      </Text>
      <Text>
        they were having issues but i did not really have the same, i&#39;m
        guessing what was going on on their end was mostly due to the way they
        installed the text to speech thing (via a python virtual environment)
      </Text>
      <Text>
        so anyways few hours later i had it working with speech-dispatcher
      </Text>
      <Text>
        i will skip the details about how cursed speech-dispatcher seems to be,
        the fact it doesn&#39;t have any kind of system service, that it get
        &quot;magically auto spawned&quot; whenever a client tries to talk to
        it, and all the various bugs and issues that seem to ensue from these
        delighftul implementation decisions
      </Text>
      <Text>
        problem was that it was painfully slow, i chalk it up to it and its
        running being made in python and the startup time for it being painfully
        slow, maybe i&#39;m wrong about that though
      </Text>
      <Text>
        also it wasn&#39;t really as clean as i would have wanted because they
        don&#39;t seem to accept input from stdin and to be able to output to
        stdout so you had to use a temporary file and that looked very sketchy
      </Text>
      <Text>
        anyways i try to time how long it takes it to get a simple sentences
        from input to output audio and it&#39;s like over 5 seconds
      </Text>
      <Text>
        this is pretty much unacceptable for these kinds of use cases obviously
      </Text>
      <Text>
        but i knew about a neat little other project, piper, that is also one of
        these famed Artificial Intelligences, but it&#39;s made in C and
        specicially to be able to run on low-end hardware and to be fast
      </Text>
      <Text>
        piper took like 300 milliseconds to from input to output sound for the
        exact same sentence with pretty much comparable audio output quality (as
        in how natural it sounds and not Microsoft Sam-mey)
      </Text>
      <Text>here is a coqui-ai voice sample</Text>
      <Text>
        <audio src="/welcome_coqui.mp3" controls></audio>
      </Text>
      <Text>and here is a piper voice sample</Text>
      <Text>
        <audio src="/welcome_piper.mp3" controls></audio>
      </Text>
      <Text>
        like, piper does sound a tad bit more &quot;robotey&quot; but also i
        feel its diction feels more natural but anyways its not like we can
        afford to wait over 5 seconds for any action, so piper it is then
      </Text>
      <Text>
        so in this post i will mainly try to guide you through how to get
        speech-dispatcher setup for usage with piper, meaning you can then use
        piper system wide for any screen reading needs
      </Text>
      <Text>
        nota bene: i have not used it for long nor do i use screen reading
        system wide, my use cases were mainly for ebook reading with calibre
        read-aloud feature and that worked fine for me
      </Text>
      <Text>
        there might be some kinks and quirks that make this not an actual ideal
        daily driver setup for people that rely purely on a screen reader and it
        being stable and trusting it won&#39;t just implode out of nowhere to
        interact with their computer
      </Text>
      <Text>
        but still, i figured this information could still be useful to share
      </Text>
      <Heading as="h3" id="the-how">
        the how
      </Heading>
      <Text>
        okay so i am running endeavouros (so arch linux) with kde but this
        should apply to any distribution (but might need to lookup the package
        names if different on yours) and kde (but that shouldn&#39;t really
        matter)
      </Text>
      <Text>
        the first thing i did was check the &quot;accesibility tools&quot;
        packages installed by endeavouros and turns out all you really need to
        do (screen reader wise) is grab <code>espeak-ng orca</code> and at least
        on arch that will pull all the other dependencies we need like
        speech-dispatcher (and should automatically integrate with stuff like
        gnome and kde)
      </Text>
      <Text>
        next we want to grab a release of piper so head over to{' '}
        <a href="https://github.com/rhasspy/piper/releases/">
          https://github.com/rhasspy/piper/releases/
        </a>{' '}
        and simply grab the <code>amd64</code> or <code>arm64</code> prebuilt
        binaries depending on your architecture and one of the voices (i went
        with <code>en-us-amy-low</code>, mainly because it was the first one in
        order lol)
      </Text>
      <Text>
        now extract the piper release anywhere you please, extract the voice in
        the same folder (you can put it anywhere really but i just put it in the
        same folder)
      </Text>
      <Text>and youre pretty much all done for the requirements part</Text>
      <Text>
        i will assume you also went with the voice en-us-amy-low to make
        commands that will come up easier, but make sure to replace this with
        the actual voice you picked if different
      </Text>
      <Text>
        you can test that speech dispatcher is working with all the defaults for
        now by running
      </Text>
      <pre>
        <code className="language-bash">
          spd-say &quot;Hello world this is a test sentence&quot;
        </code>
      </pre>
      <Text>
        and ideally you get some audio output (but for now with a terrible
        default voice), if not i&#39;m sorry but i blame foss devs for their
        support of accessibility features
      </Text>
      <Text>and you can test piper by going into the folder and running</Text>
      <pre>
        <code className="language-bash">
          echo &quot;Hello world this is a test sentence&quot; | ./piper --model
          en-us-amy-low.onnx --output_file - | paplay
        </code>
      </pre>
      <Text>
        the output file with a dash simply tells it to output to stdout and we
        pipe it directly in paplay which is just the pulseaudio version of aplay
        (alsa play), meaning it just works fine on most distributions, even if
        you use pipewire so thats that
      </Text>
      <Text>
        if both of these commands ran fine youre already 80% of the way there
        and we just need to create a little configuration file and set some
        default config values (but you could also just use the kde accessibility
        settings panel or orca settings to actually set these values, it should
        work the same)
      </Text>
      <Text>
        so the next step is to create a new module for speech-dispatcher
      </Text>
      <Text>
        so we will be creating a new file{' '}
        <code>/etc/speech-dispatcher/modules/piper-generic.conf</code>
      </Text>
      <pre>
        <code className="language-bash">
          sudo touch /etc/speech-dispatcher/modules/piper-generic.conf
        </code>
      </pre>
      <Text>and edit it and fill it with these two following lines</Text>
      <pre>
        <code className="language-bash">
          sudo $EDITOR /etc/speech-dispatcher/modules/piper-generic.conf
        </code>
      </pre>
      <Text>and these are the two lines</Text>
      <pre>
        <code className="language-conf">
          GenericExecuteSynth &quot;echo \&#39;$DATA\&#39; |
          /home/user/Documents/piper/piper --model
          /home/user/Documents/piper/en-us-amy-low.onnx --output_raw |
          $PLAY_COMMAND&quot; AddVoice &quot;en&quot; &quot;FEMALE1&quot;
          &quot;en_UK/apope_low&quot;
        </code>
      </pre>
      <Text>
        so the first line is pretty much the piper one i made you run earlier
        but with variables instead of harcoded values, <code>$DATA</code> is
        handled by speech dispatcher and <code>$PLAY_COMMAND</code> should just
        default to aplay or paplay on most systems
      </Text>
      <Text>
        the things you care about are mainly the actual <code>realpath</code>{' '}
        (so the full path) to the piper executable as well as the full path to
        the voice model
      </Text>
      <Text>
        the second line is just because of how speech dispatcher is made to
        handle a quantity of different voices so we tell it to add a new one so
        we can later select it in the options for it to be happy but none of the
        actual values in this line <strong>actually</strong> matter in any way
        as long as you can just write the same ones in the config file later
      </Text>
      <Text>save the file, exit and you&#39;re 95% there now</Text>
      <Text>
        you can probably (maybe after a reboot) already just use a gui like orca
        settings now to select piper-generic as speech engine and the default
        voice should automatically be the one we just added
      </Text>
      <Text>
        but in case here is how to also set the default settings for
        speech-dispatcher to use the new module we just added
      </Text>
      <Text>
        you want to edit <code>/etc/speech-dispatcher/speechd.conf</code> so
      </Text>
      <pre>
        <code className="language-bash">
          sudo $EDITOR /etc/speech-dispatcher/speechd.conf
        </code>
      </pre>
      <Text>
        and you can either search for the commented lines i&#39;m about to give
        you and uncomment them and edit them manually or just add the 3
        following lines at the end of the file, same thing
      </Text>
      <pre>
        <code className="language-conf">
          DefaultVoiceType &quot;FEMALE1&quot; DefaultLanguage &quot;en&quot;
          DefaultModule piper-generic
        </code>
      </pre>
      <Text>
        if you edited any of the names in the previous module file on the second
        line for the voice then make sure to adjust accordingly
      </Text>
      <Text>
        but yeah thats pretty much it, save the file and exit and you&#39;re
        done
      </Text>
      <Text>
        you can now try running the <code>spd-say</code> command again and it
        should just work
      </Text>
      <pre>
        <code className="language-bash">
          spd-say &quot;Hello world this is a test sentence&quot;
        </code>
      </pre>
      <Text>
        meaning that now anything that integrates with speech-dispatcher (which
        is a bunch of stuff on linux actually so that&#39;s nice) like firefox,
        calibre reader, or even system wide use will use the new piper module we
        just configured
      </Text>
      <Text>finally no more 1998 Fossoft Sam voice, enjoy</Text>
      <Heading as="h3" id="what-next">
        what next
      </Heading>
      <Text>
        to actually make this properly usable system wide and better there&#39;s
        some stuff i still need to figure out such as adjusting diction speed
        and whatnot
      </Text>
    </Container>
  );
};

export default Boop;
