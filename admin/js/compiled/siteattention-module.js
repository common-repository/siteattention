'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    'use strict';

    var SiteAttentionWordPress = function () {
        function SiteAttentionWordPress() {
            _classCallCheck(this, SiteAttentionWordPress);

            this.domElements = {

                wpContent: document.getElementById('wpcontent')
            };
        }

        /**
         * Gets the post id used as the pid
         * @return int
         */


        _createClass(SiteAttentionWordPress, [{
            key: 'getPid',
            value: function getPid() {
                return +SiteAttentionInfo.pid;
            }

            /**
             * Returns the iid if set
             * @return string
             */

        }, {
            key: 'getIId',
            value: function getIId() {
                return SiteAttentionInfo.iid;
            }

            /**
             * Returns the cms code
             * @return {string} wordpress short code
             */

        }, {
            key: 'getCMS',
            value: function getCMS() {
                return SiteAttentionModule.Cms.WordPress;
            }

            /**
             * Gets the post type
             * @return string
             */

        }, {
            key: 'getType',
            value: function getType() {
                return SiteAttentionInfo.post_type;
            }

            /**
             * Gets the language from the WP site config or the users navigator language
             * @return string
             */

        }, {
            key: 'getLang',
            value: function getLang() {
                return SiteAttentionInfo.language || navigator.language || null;
            }

            /**
             * Gets the user name (technically the wordpress user_login which is unchangeable)
             * @return string
             */

        }, {
            key: 'getUser',
            value: function getUser() {
                return SiteAttentionInfo.user_name;
            }

            /**
             * Gets the full link to the post (before saving this isn't available)
             * @return string
             */

        }, {
            key: 'getUrl',
            value: function getUrl() {
                return SiteAttentionInfo.url;
            }

            /**
             * Gets the publish status
             * @return boolean
             */

        }, {
            key: 'getPublished',
            value: function getPublished() {
                return SiteAttentionInfo.published === '1';
            }

            /**
             * Gets the fields supplied by the custom_js for mapping
             * @return array
             */

        }, {
            key: 'getMap',
            value: function getMap() {
                var fields = [];

                if (SiteAttentionInfo.post_type === 'post' || SiteAttentionInfo.post_type === 'page') {
                    fields = [{
                        seo: 'title',
                        name: 'Title',
                        selector: '#title|0',
                        type: 'FieldInput'
                    }, {
                        seo: 'url',
                        name: 'Slug',
                        selector: '#post_name|0',
                        type: 'FieldInput'
                    }, {
                        seo: 'metadescription',
                        name: 'Excerpt',
                        selector: '#excerpt|0',
                        type: 'FieldInput'
                    }, {
                        seo: 'content',
                        name: 'Content',
                        selector: '#content|0',
                        type: 'FieldTinyMCE4'
                    }, {
                        seo: 'headers',
                        name: 'Headers',
                        selector: '#content|0',
                        type: 'FieldTinyMCE4'
                    }, {
                        seo: 'images',
                        name: 'Images',
                        selector: '#content|0',
                        type: 'FieldTinyMCE4'
                    }, {
                        seo: 'videos',
                        name: 'Videos',
                        selector: '#content|0',
                        type: 'FieldTinyMCE4'
                    }, {
                        seo: 'links',
                        name: 'Links',
                        selector: '#content|0',
                        type: 'FieldTinyMCE4'
                    }];
                }

                if (SiteAttentionInfo.post_type === 'post') {
                    fields.push({
                        seo: 'metakeywords',
                        name: 'Tags',
                        selector: '#tax-input-post_tag|0',
                        type: 'FieldInput'
                    });
                }

                return SiteAttentionModule.FieldFactory(fields);
            }

            /**
             * Add siteattention-on class to the body tag
             * @return
             */

        }, {
            key: 'onShow',
            value: function onShow() {
                document.body.classList.add('siteattention-on');
            }

            /**
             * Removes the siteattention-on class from the body tag
             * @return
             */

        }, {
            key: 'onHide',
            value: function onHide() {
                document.body.classList.remove('siteattention-on');
            }

            /**
             * Hookd to after minimise
             */

        }, {
            key: 'onMinimise',
            value: function onMinimise() {
                this.domElements.wpContent.style.marginRight = 0 + 'px';
            }

            /**
             * Hookd to after maximise
             */

        }, {
            key: 'onMaximise',
            value: function onMaximise() {
                this.domElements.wpContent.style.marginRight = 350 + 'px';
            }

            /**
             * Trigger keyup event when user is changing the permalink which is the same as the url slug we need
             * @return {[type]} [description]
             */

        }, {
            key: 'permalinkEvent',
            value: function permalinkEvent() {
                $('#edit-slug-box').click(function (event) {
                    var el = document.getElementById('post_name');
                    var e = document.createEvent('HTMLEvents');

                    e.initEvent('keyup', false, true);
                    el.dispatchEvent(e);
                });
            }

            /**
             * Save the SiteAttention iid and license key in Wordpress
             * @param  {boolean}   Request status
             * @param  {string}    The license key
             * @param  {object}    Instance object
             * @return {[type]}    [description]
             */

        }, {
            key: 'saveInformation',
            value: function saveInformation(status, key, instance) {
                if (!status) return;

                $.post('/siteattention/settings', JSON.stringify({
                    key: key,
                    iid: instance.iid,
                    iname: instance.name,
                    ilocked: instance.locked
                }), function (data, textStatus, xhr) {});
            }

            /**
             * Save the instance information after sign up
             * @param  {boolean} status   Request status
             * @param  {object} instance Instance object
             * @return {[type]}          [description]
             */

        }, {
            key: 'saveInstance',
            value: function saveInstance(status, instance) {
                if (!status) return;

                $.post('/siteattention/settings', JSON.stringify({
                    iid: instance.iid,
                    iname: instance.name,
                    ilocked: instance.locked
                }), function (data, textStatus, xhr) {});
            }

            /**
             * Save the instance information after sign up
             * @param  {boolean} status     Request status
             * @param  {string}  key        License key
             * @return {[type]}          [description]
             */

        }, {
            key: 'saveLicense',
            value: function saveLicense(status, key) {
                if (!status) return;

                $.post('/siteattention/settings', JSON.stringify({
                    key: key
                }), function (data, textStatus, xhr) {});
            }

            /**
             * Adding the SiteAttention score to the sidebar
             */

        }, {
            key: 'setScore',
            value: function setScore(status, data) {
                if (!data) return;

                var readability = data.readability; //Math.round(data.readability * 10) / 10;
                var score = data.score;

                var html = '\n                <div id="siteattention-sidebarscore">\n                    <div id="siteattention-readability" class="misc-pub-section siteattention-score">\n                        <span class="siteattention-score--logo"></span>\n                        <span class="siteattention-score--title">Readability: <b>' + readability + '</b></span>\n                    </div>\n                    <div id="siteattention-score" class="misc-pub-section siteattention-score">\n                        <span class="siteattention-score--logo"></span>\n                        <span class="siteattention-score--title">SEO: <b>' + score + '%</b></span>\n                    </div>\n                </div>\n            ';

                $('#siteattention-sidebarscore').remove(); // Remove the old
                $('#misc-publishing-actions').append(html);
            }

            /**
             * Returns the wrapper container for SiteAttention
             * @return {div} The div
             */

        }, {
            key: 'getContainer',
            value: function getContainer() {
                var wpcontent = document.getElementById('wpcontent'),
                    container = document.createElement('div');

                wpcontent.style.marginRight = '350px';
                container.id = 'SAPL';

                this.setContainerHeight(container, wpcontent);

                !function (setContainerHeight, container, wpcontent) {
                    window.addEventListener('resize', function (event) {
                        setContainerHeight(container, wpcontent);
                    });
                }(this.setContainerHeight, container, wpcontent);

                document.body.appendChild(container);

                return container;
            }

            /**
             * Adjusts the height of the container div
             */

        }, {
            key: 'setContainerHeight',
            value: function setContainerHeight(container, wpcontent) {
                var wpHtmlContainer = document.querySelector("html.wp-toolbar"),
                    wpHtmlContainerStyle = window.getComputedStyle(wpHtmlContainer, null),
                    wpHtmlContainerStylePaddingTop = wpHtmlContainerStyle.paddingTop,
                    topPos = Number(wpHtmlContainerStylePaddingTop.slice(0, 2)),
                    height = window.innerHeight - topPos;

                container.style.height = height + 'px';
            }

            /**
             * Initiate SiteAttention script
             */

        }, {
            key: 'init',
            value: function init() {
                var _this = this;

                // Show SiteAttention on the page
                SiteAttention.play({
                    container: this.getContainer(),
                    minimised: false
                });

                // Load SiteAttention with the data
                SiteAttention.load({
                    pid: this.getPid(),
                    iid: this.getIId(),
                    cms: this.getCMS(),
                    type: this.getType(),
                    lang: this.getLang(),
                    user: this.getUser(),
                    url: this.getUrl(),
                    published: this.getPublished(),
                    map: this.getMap()
                });

                // Various UI conveniences
                this.onShow();
                this.permalinkEvent();

                // DB saving hooks
                SiteAttentionModule.hooks.add('after', 'register', 'Saving client information', function (s, k, i) {
                    return _this.saveInformation(s, k, i);
                });
                SiteAttentionModule.hooks.add('after', 'instance', 'Saving instance data', function (s, i) {
                    return _this.saveInstance(s, i);
                });
                SiteAttentionModule.hooks.add('after', 'license', 'Save existing license', function (s, k, i) {
                    return _this.saveInformation(s, k, i);
                });

                // UI hooks
                SiteAttentionModule.hooks.add('after', 'update', 'UI update', function (s, d) {
                    return _this.setScore(s, d);
                });
                SiteAttentionModule.hooks.add('after', 'minimise', 'Minimise', function (s) {
                    return _this.onMinimise(s);
                });
                SiteAttentionModule.hooks.add('after', 'maximise', 'Maximise', function (s) {
                    return _this.onMaximise(s);
                });
            }
        }]);

        return SiteAttentionWordPress;
    }();

    ;

    $(window).load(function () {
        if (typeof SiteAttention !== 'undefined') {
            new SiteAttentionWordPress().init();
        }
    });
})(jQuery);
//# sourceMappingURL=siteattention-module.js.map
