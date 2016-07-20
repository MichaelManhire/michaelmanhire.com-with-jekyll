---
layout: interior
title: "Performance Optimization: Speeding Up Your Website"
date: 2016-06-24
tags: [CSS, images, JavaScript, and performance]
permalink: performance-optimization
---
Performance optimization is an incredibly important, yet often overlooked, aspect of front end development. If neglected, your site will be slower and users will be more likely to click away as they're waiting for your site to load. However, if you take the time to optimize your site, it will load more quickly and your website's users will be more satisfied. In this post, I'm going to go through many of the most effective ways to optimize your website's performance.

## Concatenate Multiple Files Together ##

Oftentimes, a website will call in multiple CSS stylesheets, scripts, and images. Linking to all of these resources uses up the browser's valuable HTTP requests &mdash; and the more HTTP requests, the slower it will take for your page to load. In order to minimize the number of HTTP requests your website makes, you can concatenate multiple files of the same type into one file.

For example, this website is built using [Bourbon](http://bourbon.io/){:target="_blank"} as a framework and [Neat](http://neat.bourbon.io/){:target="_blank"} as a grid. It reads a custom stylesheet which gives it its unique design, and it also calls in [normalize.css](http://necolas.github.io/normalize.css/){:target="_blank"} and [Font Awesome](http://fontawesome.io/){:target="_blank"}. That's five separate stylesheets, and while they could be called in using five separate `<link>` elements one after the other, the better approach is to concatenate them into one stylesheet and then call in only that stylesheet. This will result in fewer HTTP requests, which allows the browser to devote more of its resources to loading the page.

When concatenating files, be sure to combine them in the order that they're called in on the webpage. Since CSS is a [cascading](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade){:target="_blank"} language, it matters which style declarations come after other style declarations. And, in case you're concatening your JavaScript files too (you should be!): since scripts often depend on other scripts, it is important to load your dependencies farther down in the main JavaScript file.

### Sprite Sheets ###

In order to reduce the number of HTTP requests for images, you can combine your images into a sprite sheet. This works best for tiny images, like icons, and can be tricky since it involves setting a different `background-position` property for each image. For websites that load many small images though, [creating a sprite sheet](https://css-tricks.com/css-sprites/){:target="_blank"} can be critical for performance optimization.

## Minify Large Files ##

If you've already concatenated your resources together, then you've already made a tremendous impact on the page speed of your website. Yet there is another trick you can do to speed it up even more. By [minifying your files](http://refresh-sf.com/){:target="_blank"}, you can remove all of the unnecessary white space from those files and clump all of the code together on one line.

Minified files are not pretty to look at, so it's a good idea to keep a copy of the file that is un-minified, so that you can still read the code and make changes to it. A common convention is to prepend `.min` to the file extension of your minified file, such as `style.min.css` or `app.min.js`. You can have both a minified and an un-minified file on your web server, but to enhance your website's performance, you should only link to the minified file from each document.

## Move Scripts to the Footer ##

As the browser reads a webpage, it moves from the first line down, one after another. When it encounters `<script>` or `<link>` tags, it immediately stops reading and instead begins to load the content from the `script` or `link`. As a result, your website will be slower to load because the browser has to stop reading your HTML and cannot continue reading it until it has finished reading your CSS or JavaScript.

That said, it is generally a good idea to link to your CSS stylesheet in the head, even if it will slow the rendering of your HTML. It makes sense for the CSS to load before the content inside the body of the document loads, because otherwise we will risk the dreaded FOUC which is when the raw HTML displays for a split-second without any CSS styles from the stylesheet. Because of this, it is best to keep your load your stylesheet before loading your HTML.

You should, however, [move most script tags](https://developers.google.com/speed/docs/insights/BlockingJS){:target="_blank"} into the footer, just before the closing body tag. Generally, rendering the HTML should be a higher priority than loading scripts, so that users can begin reading the website as soon as possible. For some sites that rely heavily on a piece of JavaScript code, containing some script tags inside the head may be unavoidable. In my experience, however, most scripts should be moved to the bottom of the body, and you will notice a tremendous performance improvement as a result.

*[FOUC]: flash of unstyled content

## Optimize Images ##

Before uploading images, you should ensure that their dimensions are not greater than they need to be. When you load an image that's thousands of pixels in height and width yet is specified in the document to have a width of just, for example, 400 pixels, the browser will still load that gigantic file when it didn't really need to. To save time, that image should be resized in an image editor to be only 400 pixels wide. It is especially important to do this now that so many people are browsing the internet with mobile devices that may have limited data plans. Those huge images will not only load super slowly on a phone, but they'll also eat up a ton of data.

If you have a large background image on a responsive site, like this site does, you can use media queries to ensure that smaller viewports load smaller images and larger viewports load larger images:

{% highlight scss %}
.hero {
    height: 100vh;
    background: url("../img/hero-small.jpg") no-repeat 85%;
    background-size: cover;

    @media screen and (min-width: rem(451px)) {
        background-image: url("../img/hero-medium.jpg");
    }

    @media screen and (min-width: rem(769px)) {
        background-image: url("../img/hero-large.jpg");
        background-position: 100% 0;
    }

    @media screen and (min-width: rem(1921px)) {
        background-image: url("../img/hero-extra-large.jpg");
    }
}
{% endhighlight %}

There is also the HTML5 `srcset` attribute on `img` elements. I have yet to implement [this technique](https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/){:target="_blank"} in any of my projects so I can't speak to it, but it looks like it's worth looking into!

[Compressing images](https://compressor.io/){:target="_blank"} is a tedious, yet important step in optimizing your website's performance. It is important to note the difference between lossy and lossless compression. Lossy compression will result in a large reduction in file size yet at the cost of reducing the quality of your image, whereas lossless compression will result in a smaller reduction in file size but no hit to the quality of the image. I typically just play with the compressor and determine which images still look okay when they're lossy and which images can only handle the lossless compression.

## Leverage Browser Caching and Enable gzip Compression ##

Leveraging browser caching involves specifying a caching policy, usually one that instructs browsers to cache your website for longer periods of time. Enabling gzip compression will compress files transmitted through HTTP requests, resulting in their being smaller and faster. Implementing these is heavily dependent on your web server's configuration, so I recommend doing some research and poking around the [HTML5 Boilerplate's Server Configs](https://github.com/h5bp/server-configs){:target="_blank"} for more information.

## Your Workflow ##

As you prepare to ship your project, you should develop a workflow for your performance optimization. Everyone works a little differently and so I won't attempt to prescribe a one-size-fits-all workflow in this article. Instead I have included a general list of questions you may want to ask yourself as you're considering optimizing your page speed:

* Is your site making multiple HTTP requests that can be concatenated into one HTTP request? Look to your CSS and JS files in particular.
* Do you have a lot of small images that may be better served through a sprite sheet?
* Are your site's CSS and JS files minified?
* Do you have scripts in the head of the document? Do they need to be there, or can they be moved to the footer without breaking the functionality of the site?
* Are there any images that have unnecessarily large dimensions? If there are, then can you use media queries or the `srcset` attribute to optimize these images for smaller viewports?
* Have you compressed all of the site's images?
* Have you added code to leverage browser caching and enable gzip compression?

Happy optimizing!