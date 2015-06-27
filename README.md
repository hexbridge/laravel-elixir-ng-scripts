# laravel-elixir-ng-scripts

Simple extension to *laravel elixir* that concatenates and annotates AngularJS files.

## Install

```
npm install --save laravel-elixir-ng-scripts
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require("laravel-elixir");

require("laravel-elixir-ng-scripts");

elixir(function(mix) {
  mix.ngScripts('scripts.json'); // json file that contains an array
  mix.ngScripts(['a.js', 'b.js']); // classic usage
});

```

#### Arguments

##### `source`:

- this can be either an `array` or a `string`
- you can also pass a `json` file that contains an array
- all files are prefixed with `options.baseDir`

##### `output`:

- output directory for the compiled file
- defaults to `public/js/app.js`

##### `options`:

- 'baseDir'
  - all input paths are relative to this
  - defaults to `resources/assets/js`
- 'ngAnnotate'
  - options for `gulp-ng-annotate`
  - defaults to `{ single_quotes: true }`

#### ngTemplates

If you want to concatenate and register AngularJS templates in the $templateCache, you can use a separate package: [`laravel-elixir-ng-templates`](https://github.com/hexbridge/laravel-elixir-ng-templates)

#### Advanced example

Create a json array in `resources/assets/js/scripts.json`

```json
[
  "../vendor/angular/angular.js",
  "app.js",
  "controllers.js",
  "templates.js"
]
```

In `Gulpfile.js`

```javascript
elixir(function(mix) {
  mix.ngScripts('scripts.json', 'public/js/all.js', {
    ngAnnotate: { single_quotes: false }
  });
});
```

HINT: I like to have bower components in `resources/assets/vendor`.

## TODO

- [ ] sourcemaps
- [ ] watch
- [ ] uglify