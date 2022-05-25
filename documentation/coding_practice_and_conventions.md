### Node.JS best practices and conventions

## This is _not_ about JS style

Advice: if you have style guide / policy, apply it automatically ( in the editor or git hook )
https://github.com/jshint/fixmyjs

Collection of (mostly) JS styles (pick one you like or write another one if none fits you)

- list of lists: http://www.jstherightway.org/

- ES5.1 spec on one page: http://es5.github.io/

http://bonsaiden.github.io/JavaScript-Garden
https://github.com/airbnb/javascript
http://nodeguide.com/style.html
https://github.com/felixge/node-style-guide
http://stackoverflow.com/questions/5495984/coding-style-guide-for-node-js-apps
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
https://github.com/rwaldron/idiomatic.js/
https://github.com/airbnb/javascript
http://dailyjs.com/2012/01/12/style/
https://github.com/jonathanong/style-guide/blob/master/javascript.md
http://www.joyent.com/developers/node/design/#codingstyle

## And not about 'best development practices' as well:

https://github.com/timoxley/best-practices
https://github.com/Snugug/north

## Lets focus on node.js

"conventions" - something not enforced by runtime / frameworks, but everyone should follow.

## modules:
  - no side effects
    - exceptions: singleton-like modules, memoizing / cache
  - Prefer one class / function per module
  - path in 'require' includes extension
  - if you need to expose async data, export function that accepts callback as a parameter (or use promises)
  - Naming:
    - lower snake case (some filesystems are non case sensitive!)
    - same name as class / function inside (but snake case)

## async
  - prefer plain old callbacks in function parameters
  - always call with (err, data) parameters
  - callback is called exactly once
  - if you need to report more than once, convert your function/class to EventEmitter or Stream
  - EventEmitter: expect more then (and less then) one listener. All handlers are called synchronously one after another.
  - Promises / Thunks are OK but if you can express your flow with promises but cannot with callbacks you might want to refactor architecture

## packages
  - use standard top level structure: `lib/`, `bin/`, `test/`, `test/integration/`, `examples/`, `src/`, `index.js`, `package.json`, `README.md`, `LICENSE`, `Changelog.md`
  - use expressive non-creative name when possible
  - use proper non-creative keywords in package.json (always)
  - use semver!
  - package.json scripts:
    - npm start
    - npm run debug
    - npm npm run integration

  - always use `npm version` to bump to a new version (it creates corresponding tag and checks for unstaged code)
  - "automatic semver":
    - you have version x.y.z and new version
      - make sure all test pass
      - (1) test old code with `test/integration` from new
      - (2) test new code with `test/integration` from old

      - if (1) and (2) pass, publish x.y.z+1
      - if (1) fail, publish x+1.0.0 (you have new, backward-incompatible API change)
      - if (2) fail, publish x.y+1.0 (you have new functionality, but old behaves like before)

  - make everything traverseable from single require object.

  - README:
     - use same examples you have in `test` or `examples` verbatim (prefer some tool that assemble them for you)
     - Cover at least everything visible from top require
  - Changelog: answers different question than git log. Git: "why do we have this change?". Changelog: "Why should I upgrade this package?"

## performance
  - lazy everything
  - zero penalty if not used
  - never optimise first, but always know algorithmic complexity. "o(n) is just fine, I only have 300 items here" - it'll be 30k items next year
  - if in doubt, use statistical profiler first ( node --prof ) and analyse v8.log using nprof or node-tick-processor. Look ar CPU / GC tick ratio before looking at hot functions.
  - after all usual suspects checked go to http://mrale.ph/blog/2011/12/18/v8-optimization-checklist.html

## advanced topics
  - make sure you code work as expected if callback function throws an exception.
  - make sure your library is Domains friendly