# newtheme

newtheme is a [Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/) powered minimalist base theme. It is optimized for both responsive and mobile first web design. Built to encourage best modern front end practices. 

# INSTALLATION
- Install this theme using the official Backdrop CMS instructions at
  https://backdropcms.org/guide/themes

# Using Bundler

[Bundler](http://bundler.io/) is the standard for managing Ruby gem dependencies, and it is highly encouraged you use it to ensure that your project is using the correct version of required gems. If you are updating your gems without understanding what they break, it's likely you're going to get yourself into trouble. Bundler helps to ensure you can use the cutting edge gems on new projects while not breaking old projects.

Installing Bundler is easy, type the following into your command line:

`gem install bundler`

Once you've installed Bundler, in your theme's directory, where your `config.rb` file is, create a file called `Gemfile`. The Gemfile that comes with new newtheme 1.x subthemes looks like this:

```
# Pull gems from RubyGems
source 'https://rubygems.org'

gem 'toolkit', '~>1.0.0'
gem 'singularitygs', '~>1.0.7'
gem 'breakpoint', '~>2.0.2'

# Now that you're using Bundler, you need to run 
`bundle exec compass watch` instead of simply 
`compass watch`.
```
Once you've set up your Gemfile, in your command line, run the following:

`bundle install`

This will install the relevant gems and ensure your theme stays at those versions. Then, to compile, instead of using `compass watch`, use the following:

`bundle exec compass watch`

## Using Bower 

Alternatively, Singularity can be installed with [Bower](http://bower.io/):

`bower install singularity --save`

## Using Eyeglass

Singularity can even be installed as an [Eyeglass](https://github.com/sass-eyeglass/eyeglass) module! 

`npm install singularitygs --save-dev`

### Notes

```
Singularity requires a Sass compiler with full feature parity with the
Ruby Sass 3.3 implementation in order to work.

```
### Setting Up a Basic Grid

[Grids](https://github.com/at-import/Singularity/wiki/Creating-Grids) are made of 3 parts, the Grid definition defining columns, Gutter definition defining spacing between columns, Gutter Style defining how gutters are positioned relative to a column. Singularity supports [Symmetric](https://github.com/at-import/Singularity/wiki/Creating-Grids#symmetric-grids) and [Asymmetric](https://github.com/at-import/Singularity/wiki/Creating-Grids#asymmetric-grids) grids, as well as fluid and [fixed](https://github.com/at-import/Singularity/wiki/Creating-Grids#fixed-gutters) gutters. Setting grids up this way puts them into Singularity's **Global Grid Context**.

## Recommended Backdrop modules

- [Blockify](https://github.com/backdrop-contrib/blockify)
- [Styleguide](https://github.com/backdrop-contrib/styleguide)

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.

### Current Maintainers

The "newtheme" Theme is currently maintained by [Ezenwa Isiogu](http://ezenwa.io/) (@ezenwaisiogu) (https://github.com/clickbox)

-This theme is currently seeking maintainers.

### Credits

This Theme is adpated from [Aurora](https://www.drupal.org/project/aurora) for Drupal by Sam Richard (https://github.com/snugug)
