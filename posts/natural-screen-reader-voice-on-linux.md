---
title: 'more natural screen reader voice on linux'
description: 'using piper for a more natural sounding voice with speech-dispatcher'
date: '2023-06-07'
wip: true
---

### the why

recently i wanted to read a book but i'm not very good at it

so i figured i would get a screen reader to do it for me while i read along to help

regretfully i have brainrot and use linux as a daily driver

so the natural thing everybody will tell you to do is use a combination of orca, espeak-ng and speech-dispatcher (actually have no clue what two third of these do but seems like they're need for proper system-wide integration)

however i was soon disanchented as i realized the voices that came with it sound like Microsoft Sam's 1998 release (we love foss)

so anyways cue a couple hours of me trying to find "out of the box" better voices for all of this setup

tried festival voices, festival hts voices (whatever these are but random internet person said it was "better") and whatever i could find on the aur

all Microsoft Sam tier to be honest

but i knew better stuff was out there even if maybe not packaged nicely already to work with all of these system integrations, that use the magic "Artificial Intelligences"

so anyways first quick google brought me to an coqui-ai issue of somebody that was trying to get it to work with speech-dispatcher

they were having issues but i did not really have the same, i'm guessing what was going on on their end was mostly due to the way they installed the text to speech thing (via a python virtual environment)

so anyways few hours later i had it working with speech-dispatcher

i will skip the details about how cursed speech-dispatcher seems to be, the fact it doesn't have any kind of system service, that it get "magically auto spawned" whenever a client tries to talk to it, and all the various bugs and issues that seem to ensue from these delighftul implementation decisions

problem was that it was painfully slow, i chalk it up to it and its running being made in python and the startup time for it being painfully slow, maybe i'm wrong about that though

also it wasn't really as clean as i would have wanted because they don't seem to accept input from stdin and to be able to output to stdout so you had to use a temporary file and that looked very sketchy

anyways i try to time how long it takes it to get a simple sentences from input to output audio and it's like over 5 seconds

this is pretty much unacceptable for these kinds of use cases obviously

but i knew about a neat little other project, piper, that is also one of these famed Artificial Intelligences, but it's made in C and specicially to be able to run on low-end hardware and to be fast

piper took like 300 milliseconds to from input to output sound for the exact same sentence with pretty much comparable audio output quality (as in how natural it sounds and not Microsoft Sam-mey)

here is a coqui-ai voice sample

<audio src="/welcome_coqui.mp3" controls></audio>

and here is a piper voice sample

<audio src="/welcome_piper.mp3" controls></audio>

like, piper does sound a tad bit more "robotey" but also i feel its diction feels more natural but anyways its not like we can afford to wait over 5 seconds for any action, so piper it is then

so in this post i will mainly try to guide you through how to get speech-dispatcher setup for usage with piper, meaning you can then use piper system wide for any screen reading needs

nota bene: i have not used it for long nor do i use screen reading system wide, my use cases were mainly for ebook reading with calibre read-aloud feature and that worked fine for me

there might be some kinks and quirks that make this not an actual ideal daily driver setup for people that rely purely on a screen reader and it being stable and trusting it won't just implode out of nowhere to interact with their computer

but still, i figured this information could still be useful to share

### the how

okay so i am running endeavouros (so arch linux) with kde but this should apply to any distribution (but might need to lookup the package names if different on yours) and kde (but that shouldn't really matter)

the first thing i did was check the "accesibility tools" packages installed by endeavouros and turns out all you really need to do (screen reader wise) is grab `espeak-ng orca` and at least on arch that will pull all the other dependencies we need like speech-dispatcher (and should automatically integrate with stuff like gnome and kde)

next we want to grab a release of piper so head over to https://github.com/rhasspy/piper/releases/ and simply grab the `amd64` or `arm64` prebuilt binaries depending on your architecture and one of the voices (i went with `en-us-amy-low`, mainly because it was the first one in order lol)

now extract the piper release anywhere you please, extract the voice in the same folder (you can put it anywhere really but i just put it in the same folder)

and youre pretty much all done for the requirements part

i will assume you also went with the voice en-us-amy-low to make commands that will come up easier, but make sure to replace this with the actual voice you picked if different

you can test that speech dispatcher is working with all the defaults for now by running

```bash
spd-say "Hello world this is a test sentence"
```

and ideally you get some audio output (but for now with a terrible default voice), if not i'm sorry but i blame foss devs for their support of accessibility features

and you can test piper by going into the folder and running

```bash
echo "Hello world this is a test sentence" | ./piper --model en-us-amy-low.onnx --output_file - | paplay 
```

the output file with a dash simply tells it to output to stdout and we pipe it directly in paplay which is just the pulseaudio version of aplay (alsa play), meaning it just works fine on most distributions, even if you use pipewire so thats that

if both of these commands ran fine youre already 80% of the way there and we just need to create a little configuration file and set some default config values (but you could also just use the kde accessibility settings panel or orca settings to actually set these values, it should work the same)

so the next step is to create a new module for speech-dispatcher

so we will be creating a new file `/etc/speech-dispatcher/modules/piper-generic.conf`

```bash
sudo touch /etc/speech-dispatcher/modules/piper-generic.conf
```

and edit it and fill it with these two following lines

```bash
sudo $EDITOR /etc/speech-dispatcher/modules/piper-generic.conf
```

and these are the two lines


```conf
GenericExecuteSynth "echo \'$DATA\' | /home/user/Documents/piper/piper --model /home/user/Documents/piper/en-us-amy-low.onnx --output_raw | $PLAY_COMMAND"
AddVoice "en" "FEMALE1" "en_UK/apope_low"
```

so the first line is pretty much the piper one i made you run earlier but with variables instead of harcoded values, `$DATA` is handled by speech dispatcher and `$PLAY_COMMAND` should just default to aplay or paplay on most systems

the things you care about are mainly the actual `realpath` (so the full path) to the piper executable as well as the full path to the voice model

the second line is just because of how speech dispatcher is made to handle a quantity of different voices so we tell it to add a new one so we can later select it in the options for it to be happy but none of the actual values in this line **actually** matter in any way as long as you can just write the same ones in the config file later

save the file, exit and you're 95% there now

you can probably (maybe after a reboot) already just use a gui like orca settings now to select piper-generic as speech engine and the default voice should automatically be the one we just added

but in case here is how to also set the default settings for speech-dispatcher to use the new module we just added

you want to edit `/etc/speech-dispatcher/speechd.conf` so

```bash
sudo $EDITOR /etc/speech-dispatcher/speechd.conf
```

and you can either search for the commented lines i'm about to give you and uncomment them and edit them manually or just add the 3 following lines at the end of the file, same thing

```conf
DefaultVoiceType  "FEMALE1"
DefaultLanguage "en"
DefaultModule piper-generic
```

if you edited any of the names in the previous module file on the second line for the voice then make sure to adjust accordingly

but yeah thats pretty much it, save the file and exit and you're done

you can now try running the `spd-say` command again and it should just work

```bash
spd-say "Hello world this is a test sentence"
```

meaning that now anything that integrates with speech-dispatcher (which is a bunch of stuff on linux actually so that's nice) like firefox, calibre reader, or even system wide use will use the new piper module we just configured

finally no more 1998 Fossoft Sam voice, enjoy


### what next

to actually make this properly usable system wide and better there's some stuff i still need to figure out such as adjusting diction speed and whatnot
