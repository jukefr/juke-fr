# [juke-fr](https://code.juke.fr/kay/juke-fr)
site built in typescript with next.js, chakra ui, framer motion, three.js available on juke.fr
## instructioms

![jinx the cat my beolved](components/assets/jinx.png)

### repository

the latest automatic release is always on https://juke.fr

```bash
$ git clone https://code.juke.fr/kay/juke-fr.git

$ npm i

$ npm run dev
```

### test suite

playwright is used for testing

```bash
$ npm run test:setup # only needed once to download the browsers

$ npm run test
```

playwright is cool because it gives you traces with screenshots you can go through step by step so yeah

### tested upgrade

the test suite can be used with npm-check-updates to mass upgrade the node modules and make sure stuff still (at least somewhat) works

```bash
$ npm run tested-upgrade
```

it will upgrade all the packages then run the test and do them one by one incrementally if that fails and not do any of the ones that makes the tests fail


## Development

To clone the repository locally:

```bash
$ git clone https://code.juke.fr/kay/juke-fr.git
```

## Contributing

Feel free to contact via the email bellow with a patch or anything.

### Issues
Open new issues by mailing [issues+juke-fr@juke.fr](mailto:issues+juke-fr@juke.fr)

---
beep boop

