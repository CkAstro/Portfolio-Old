# Portfolio

This project is available at [chriskolb.dev](https://chriskolb.dev).\
It is currently in the process of being converted to TypeScript.

View many of my smaller projects created while I was working on my PhD, including a hand-written number-guessing neural network, a tool which allows you to view the bulk of my thesis data, and an interactive, animated volume rendering of a fluid instability.

## Main Projects

Two large projects are available as stand-alone web apps.

#### DataVis

A 3D data visualization tool available at [datavis.chriskolb.dev](https://datavis.chriskolb.dev) and on github at [github.com/CkAstro/datavis](https://github.com/CkAstro/datavis). Import and explore large 3D scalar datasets.

#### Reversi

A multiplayer Reversi game app available at [reversi.chriskolb.dev](https://reversi.chriskolb.dev) and on github at [github.com/CkAstro/reversi](https://github.com/CkAstro/reversi). Play with friends, observe active games, and more. Supports numerous concurrent games.

## Smaller Projects

**Note**: Most of these smaller projects are imported from pure JS and are not currently optimized for React.

#### Fluid Instabilities

An animated, interactive, 3D volume rendering of a Rayleigh-Taylor instability. Learn more on the portfolio page!

#### Supernova Emission

Scientifically-accurate emission (to first order) from a supernova in an asymmetric circumstellar medium. A dense disk of gas surrounded the star prior to explosion, and now that gas is blocking light. Rotate the figure and see how the disk hides portions of the blastwave from view.

## Imports not Working?

`jsconfig.json` may have issues with the `baseUrl` and `path` compiler options.\
Since node will always check `node_modules` for an import, a simple work-around is to create a new `node_modules` in `src` and add symlinks pointing back to the `src` directory. e.g.,

```
cd server/src/node_modules
ln -s .. @
```

and now you may use absolute imports: `import { gameService } from '@/services';`  
**Note**: This is automated with a post-install script in `server/packages.json`
