( function ( $ )
{
    'use strict';
    class SiteAttentionWordPress
    {
        constructor()
        {
            this.domElements = {

                wpContent: document.getElementById( 'wpcontent' )
            }
            this.xhr = new XMLHttpRequest;

            this.cmslang = document.documentElement.lang;
            if($('#post-title-0').length) {
                this.posttitleHtml = $("#post-title-0").val();
                this.posttitleHeader1Html = '';
                if($("#post-title-0").val()) {
                    this.posttitleHeader1Html = '<h1>'+$("#post-title-0").val()+'</h1>';
                }
                this.contentHtml = wp.data.select( "core/editor" ).getEditedPostContent();
                //this.postURLHtml = wp.data.select('core/editor').getPermalinkParts().postName;
                this.postURLHtml = this.getUrl();
                this.postExcerptHtml = wp.data.select('core/editor').getEditedPostAttribute('excerpt');
                this.featuredImageHtml = $('.editor-post-featured-image .editor-post-featured-image__preview').html();
                this.featuredImageHtmlNew = $('.editor-post-featured-image .editor-post-featured-image__preview').html();
                var featuredImage = this.featuredImageHtml;

                if(featuredImage == undefined) {
                    this.featuredImageUrl = this.contentHtml;
                } else {
                    this.featuredImageUrl = this.featuredImageHtmlNew;
                }

                this.posttitleid = 'post-title-0';
                this.posttitleHeader1id = 'post-title-0';
                this.contentid = 'editor-block-list__block-edit block-editor-block-list__block-edit';
                this.posturlid = 'posttoggelURL';
                this.excerptid = 'postExcerpt';
                this.imageid = 'set-post-thumbnail';
            } else {
                this.posttitleHtml = $("#title").val();
                this.posttitleHeader1Html = '';
                if($("#title").val()) {
                    this.posttitleHeader1Html = '<h1>'+$("#title").val()+'</h1>';
                }
                var getVisualContentHtml = tinymce.activeEditor;

                if(getVisualContentHtml) {
                    if(jQuery('#postdivrich .wp-core-ui.tmce-active').length == 1) {
                        var getContentHtml = tinymce.activeEditor.getContent();
                    } else {
                        var getContentHtml = $("#content").val();
                    }
                } else {
                    var getContentHtml = $("#content").val();
                }
                this.contentHtml = getContentHtml;
                this.postURLHtml = this.getUrl();
                this.postExcerptHtml = $("#excerpt").val();
                this.featuredImageHtml = $("#set-post-thumbnail").find('img');
                this.featuredImageHtmlNew = $("#set-post-thumbnail").html();
                var featuredImage = this.featuredImageHtml;

                if(featuredImage.length == 0) {
                    this.featuredImageUrl = this.contentHtml;
                } else {
                    this.featuredImageUrl = this.featuredImageHtmlNew;
                }

                this.posttitleid = 'title';
                this.posttitleHeader1id = 'title';
                this.contentid = 'content';
                this.posturlid = 'post_name';
                this.excerptid = 'excerpt';
                this.imageid = 'set-post-thumbnail';
            }

            if($('#yoast_wpseo_title').val() !== undefined && $('#yoast_wpseo_title').val() !== '') {
                this.posttitleHtml = $('#yoast_wpseo_title').val();
                this.posttitleid = 'postYoastMetaTitle';
            }

            if($('#yoast_wpseo_metadesc').val() !== undefined && $('#yoast_wpseo_metadesc').val() !== '') {
                this.postExcerptHtml = $('#yoast_wpseo_metadesc').val();
                this.excerptid = 'postYoastMetaDescription';
            }
        }

        /**
         * Gets the post id used as the pid
         * @return int
         */
        getPid()
        {
            return + SiteAttentionInfo.pid;
        }

        /**
         * Returns the iid if set
         * @return string
         */
        getIId()
        {
            return SiteAttentionInfo.iid;
        }

        /**
         * Returns the cms code
         * @return {string} wordpress short code
         */
        getCMS()
        {
            return 'WP';
        }

        /**
         * Gets the post type
         * @return string
         */
        getType()
        {
            return SiteAttentionInfo.post_type;
        }

        /**
         * Gets the language from the WP site config or the users navigator language
         * @return string
         */
        getLang()
        {
            return SiteAttentionInfo.language || navigator.language || null;
        }

        /**
         * Gets the user name (technically the wordpress user_login which is unchangeable)
         * @return string
         */
        getUser()
        {
            return SiteAttentionInfo.user_name;
        }

        /**
         * Gets the full link to the post (before saving this isn't available)
         * @return string
         */
        getUrl()
        {
            if(SiteAttentionInfo.published == 'publish'){
                SiteAttentionInfo.url = wp.data.select( 'core/editor' ).getPermalink();
            }
            return SiteAttentionInfo.url;
        }

        /**
         * Gets the full link to the post (before saving this isn't available)
         * @return string
         */
        getSiteUrl()
        {
            return SiteAttentionInfo.site_url;
        }

        /**
         * Gets the publish status
         * @return boolean
         */
        getPublished()
        {
            if(SiteAttentionInfo.published == 'publish'){
                SiteAttentionInfo.published = true;
            } else {
                SiteAttentionInfo.published = false;
            }
            return SiteAttentionInfo.published;
        }

        /**
         * Gets the fields supplied by the custom_js for mapping
         * @return array
         */
        getMap()
        {
            let fields = [];

            if
            (
                SiteAttentionInfo.post_type === 'post' ||
                SiteAttentionInfo.post_type === 'page'
            )
            {
                fields = [
                    {
                        "selectorId": this.posttitleid,
                        "selectorClassNames": "",
                        "scope": "metatitle",
                        "delta": "",
                        "fieldName": "Title",
                        "fieldLabel": "Title"
                    },
                    {
                        "selectorId": this.excerptid,
                        "selectorClassNames": "",
                        "scope": "metadescription",
                        "delta": "",
                        "fieldName": "Meta Description",
                        "fieldLabel": "Meta Description"
                    },
                    {
                        "selectorId": this.contentid,
                        "selectorClassNames": "",
                        "scope": "content",
                        "delta": "",
                        "fieldName": "Content area",
                        "fieldLabel": "Content area"
                    },
                    {
                        "selectorId": this.posttitleHeader1id,
                        "selectorClassNames": "",
                        "scope": "headerh1",
                        "delta": "",
                        "fieldName": "Title",
                        "fieldLabel": "Title"
                    },
                    {
                        "selectorId": this.contentid,
                        "selectorClassNames": "",
                        "scope": "headers",
                        "delta": "",
                        "fieldName": "Content area",
                        "fieldLabel": "Content area"
                    },
                    {
                        "selectorId": this.posturlid,
                        "selectorClassNames": "",
                        "scope": "url",
                        "delta": "",
                        "fieldName": "Slug",
                        "fieldLabel": "Slug"
                    },
                    {
                        "selectorId": this.contentid,
                        "selectorClassNames": "",
                        "scope": "links",
                        "delta": "",
                        "fieldName": "Content area",
                        "fieldLabel": "Content area"
                    },
                    {
                        "selectorId": this.contentid,
                        "selectorClassNames": "",
                        "scope": "images",
                        "delta": "",
                        "fieldName": "Content area",
                        "fieldLabel": "Content area"
                    },
                    {
                        "selectorId": this.imageid,
                        "selectorClassNames": "",
                        "scope": "images",
                        "delta": "",
                        "fieldName": "Featured Image",
                        "fieldLabel": "Featured Image"
                    }
                ];
            }

            if
            (
                SiteAttentionInfo.post_type === 'post'
            )
            {
                fields.push(
                {
                    seo: 'metakeywords',
                    name: 'Tags',
                    selector: '#tax-input-post_tag|0',
                    type: 'FieldInput'
                } );
            }

            return fields;
        }

        /**
         * Add siteattention-on class to the body tag
         * @return
         */
        onShow()
        {
            document.body.classList.add( 'siteattention-on' );
        }

        /**
         * Removes the siteattention-on class from the body tag
         * @return
         */
        onHide()
        {
            document.body.classList.remove( 'siteattention-on' );
        }

        /**
         * Hookd to after minimise
         */
        onMinimise()
        {
            this.domElements.wpContent.style.marginRight = `${0}px`;
        }

        /**
         * Hookd to after maximise
         */
        onMaximise()
        {
            this.domElements.wpContent.style.marginRight = `${350}px`
        }

        /**
         * Trigger keyup event when user is changing the permalink which is the same as the url slug we need
         * @return {[type]} [description]
         */
        permalinkEvent()
        {
            $( '#edit-slug-box' ).click( function ( event )
            {
                let el = document.getElementById( 'post_name' );
                let e = document.createEvent( 'HTMLEvents' );

                e.initEvent( 'keyup', false, true );
                el.dispatchEvent( e );
            } );
        }

        /**
         * Save the SiteAttention iid and license key in Wordpress
         * @param  {boolean}   Request status
         * @param  {string}    The license key
         * @param  {object}    Instance object
         * @return {[type]}    [description]
         */
        saveInformation( status, key, instance )
        {
            if ( !status ) return;

            $.post('/siteattention/settings',JSON.stringify({
                key: key,
                iid: instance.iid,
                iname: instance.name,
                ilocked: instance.locked,
            }),function(data,textStatus,xhr){});
        }

        /**
         * Save the instance information after sign up
         * @param  {boolean} status   Request status
         * @param  {object} instance Instance object
         * @return {[type]}          [description]
         */
        saveInstance( status, instance )
        {
            if ( !status ) return;

            $.post('/siteattention/settings',JSON.stringify({
                iid: instance.iid,
                iname: instance.name,
                ilocked: instance.locked,
            }),function(data,textStatus,xhr){});
        }

        /**
         * Save the instance information after sign up
         * @param  {boolean} status     Request status
         * @param  {string}  key        License key
         * @return {[type]}          [description]
         */
        saveLicense( status, key )
        {
            if ( !status ) return;

            $.post('/siteattention/settings',JSON.stringify({
                key: key,
            }),function(data,textStatus,xhr){});
        }

        /**
         * Adding the SiteAttention score to the sidebar
         */
        setScore()
        {
            var readability = 'Easy';
            var score = $('.SiteAttention_score_value').html();
            let html = `
                <div id="siteattention-sidebarscore">
                    <div id="siteattention-readability" class="misc-pub-section siteattention-score">
                        <span class="siteattention-score--logo"></span>
                        <span class="siteattention-score--title">Readability: <b>${readability}</b></span>
                    </div>
                    <div id="siteattention-score" class="misc-pub-section siteattention-score">
                        <span class="siteattention-score--logo"></span>
                        <span class="siteattention-score--title">SEO: <b>${score}</b></span>
                    </div>
                </div>
            `;

            $( '#siteattention-sidebarscore' ).remove(); // Remove the old
            $( '#misc-publishing-actions' ).append( html );
        }

        /**
         * Adding the SiteAttention score to the sidebar
         */
        getDefaultView()
        {
            //console.log(SiteAttentionInfo);
            let html = `<div id="SiteAttention" class="SiteAttention_container SiteAttention_max SiteAttention_visible">
                            <div class="SiteAttention_header">
                                <div id="siteattention_logo"><img src="${SiteAttentionInfo.site_url}/wp-content/plugins/siteattention/admin/images/logo.png" class="siteattention_head_logo" style="width:290px;"></div>     
                            </div>
                            <div class="SiteAttention_tab_options">
                                <!--<div class="tab_title" id="seo_analysis"><a href="javascript:void(0)">SEO Analysis</a></div>-->
                                <div class="SiteAttention_toggle_score">
                                    <div class="SiteAttention_readability_label">
                                        <p class="SiteAttention_readability_label_text">
                                            Readability
                                        </p>
                                    </div>
                                    <div class="SiteAttention_readability">
                                        <div class="SiteAttention_readability_bar">
                                            <div class="SiteAttention_readability_bar_background">
                                                <span class="SiteAttention_readability_bar_background_span1"></span>
                                                <span class="SiteAttention_readability_bar_background_span2"></span>
                                                <span class="SiteAttention_readability_bar_background_span3"></span>
                                            </div>
                                            <div class="SiteAttention_readability_bar_percentage"></div>
                                            <div class="SiteAttention_readability_bar_scales">
                                                <span class="SiteAttention_readability_bar_percentage_span1"></span>
                                                <span class="SiteAttention_readability_bar_percentage_span2"></span>
                                                <span class="SiteAttention_readability_bar_percentage_span3"></span>
                                            </div>
                                            <div class="SiteAttention_readability_bar_scaleMark">
                                                <span class="SiteAttention_readability_bar_scaleMark1" style="width: 12%;"></span>
                                                <span class="SiteAttention_readability_bar_scaleMark2" style="width: 10%;"></span>
                                                <span class="SiteAttention_readability_bar_scaleMark3" style="width: 78%;"></span>
                                            </div>
                                        </div>
                                        <div class="SiteAttention_readability_score">Easy</div>
                                    </div>
                                    <div class="SiteAttention_score_label">
                                        <p id="SiteAttention_score_label_text" class="SiteAttention_score_label_p">
                                            Score
                                        </p>
                                    </div>
                                    <div class="SiteAttention_score">
                                        <div class="SiteAttention_score_bar">
                                            <div class="SiteAttention_score_bar_background"></div>
                                            <div class="SiteAttention_score_bar_percentage"></div>
                                            <div class="SiteAttention_threshold_arrow"></div>
                                            <div class="SiteAttention_threshold_text">70%</div>
                                        </div>
                                        <div class="SiteAttention_score_text">
                                            <p class="SiteAttention_score_value">100%</p>
                                        </div>
                                    </div>    
                                </div>
                                <div class="SiteAttention_keyword_rule_tab_options">
                                    <div class="tab_options keyword_tab" id="keyword_tab_view">
                                        Keywords
                                    </div>
                                    
                                    <div class="tab_options rules_tab" id="rules_tab_view">
                                        Rules
                                    </div>                                    
                                </div>
                                <div class="SiteAttention_seo_analysis">
                                    <div class="SiteAttention_add_keyword keyword_tab_view tabs_view">
                                        <div class="keyword_textbox">
                                            <div class="SiteAttention_search_phrase_tags">
                                                
                                            </div>
                                            <input id="SiteAttention_search_phrase" name="SiteAttention_search_phrase" type="text" class="SiteAttention_search_phrase" value="" placeholder="Primary Keyword">
                                        </div>
                                        <div class="keyword_helper">
                                            <button type="button" id="SiteAttention_keyword_difficulty_btn" class="SA_click_counter" data-sa-click="SA_Main_KeywordSearchButton">
                                                <span id="SiteAttention_keyword_difficulty_btn_name">Keyword Search</span>
                                            </button>
                                            
                                            <div id="SiteAttention_keyword_difficulty">
                                            <div id="SiteAttention_KD_title">
                                                <span id="SiteAttention_KD_title_text">Keyword Search</span><span id="SiteAttention_KD_title_close">X</span>
                                            </div>
                                            <select id="SiteAttention_keyword_difficulty_region" name="SiteAttention_keyword_difficulty_region" class="SiteAttention form-control selectpicker" data-size="8" data-live-search="true" data-dropup-auto="false" style="outline: 0;" tabindex="-98">
                                                <optgroup id="SiteAttention_regions_list_prim" label="Common Regions"></optgroup>
                                                <optgroup id="SiteAttention_regions_list_sec" label="Other Regions"></optgroup>
                                            </select>
                                            
                                            <div id="SiteAttention_keyword_difficulty_search_container">
                                                <input id="SiteAttention_keyword_difficulty_phrase" type="text" name="KDISearch" autocomplete="off" placeholder="search keyword ...">
                                                <div id="SiteAttention_keyword_difficulty_search_loading"></div>
                                                <!---listen to clicks ------------>
                                                <a id="SiteAttention_keyword_difficulty_search" class="SA_click_counter" data-sa-click="SA_Main_KeywordSearch_SearchButton">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                                        </svg>
                                                    </span>
                                                </a>
                                            </div>
                                            
                                            <div id="SiteAttention_keyword_difficulty_search_options" class="SA_btn-group">
                                                <button type="button" id="SiteAttention_keyword_difficulty_exact" class="active SA_KD_active" type="button" data-id="exact" name="button">exact matches</button>
                                                <button type="button" id="SiteAttention_keyword_difficulty_related" type="button" data-id="related" name="button">related phrases</button>
                                            </div>
                                            
                                            <div id="SiteAttention_keytool_results">
                                            
                                            </div>              
                                        </div>
                                        </div>
                                    </div>                                    
                                    <div class="SiteAttention_score_rules_container rules_tab_view tabs_view">                                   
                                        
                                        <div class="SiteAttention_rules_container" id="SiteAttention_rules_container">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            $( '#SAPL' ).append(html);
        }

        /**
         * Returns the wrapper container for SiteAttention
         * @return {div} The div
         */
        getContainer()
        {
            let container = document.createElement( 'div' );

            container.id = 'SAPL';
            container.className = 'SAPL';
            this.setContainerHeight( container );

            ! function ( setContainerHeight, container )
            {
                window.addEventListener( 'resize', function ( event )
                {
                    setContainerHeight( container )
                } );

            }( this.setContainerHeight, container );
            document.body.appendChild( container );
            $("#siteattention_metabox_id .inside").append(container);
            this.getDefaultView();
            this.getKeyword();
            var saplHeightNew = $('.'+container.className).height() - 282;

            $(".SiteAttention_seo_analysis").height(saplHeightNew);
            window.addEventListener( 'resize', function ( event )
            {
                var saplHeightNew = $('.'+container.className).height() - 282;
                $(".SiteAttention_seo_analysis").height(saplHeightNew);
            } );
            $("#siteattention_metabox_id .inside").append(container);
            this.getDefaultView();
            this.getKeyword();
            return container;
        }

        /**
         * get keyword from post meta
         */
        getKeyword()
        {
            var data = {
                action: 'get_postmeta',
                post_id: SiteAttentionInfo.pid
            };
            jQuery.post(ajaxurl, data, function(response) {
                var getPostMeta = jQuery.parseJSON(response);
                if(getPostMeta.length !== 0) {
                    $('.SiteAttention_search_phrase').hide();
                    $('.SiteAttention_search_phrase_tags').show();
                    $('.rules_tab').removeClass('disabletab');

                    $('.SiteAttention_toggle_score').show();
                    if($('.keyword_tab.active_tab').length === 0) {
                        $('.rules_tab').addClass('active_tab');
                        $('.SiteAttention_score_rules_container').show();
                        $('.SiteAttention_add_keyword').hide();
                    }
                    document.getElementById('SiteAttention_search_phrase').value = '';
                    let keywordhtml = '';
                    $.each(getPostMeta, function(key, value){
                        keywordhtml += `<div class="SiteAttention_keyword_tags">
                                            <span>${value}</span>
                                            <div class="SA_keyword_tag_delete">X</div>
                                       </div>`;
                    });
                    keywordhtml += `<button type="button" id="SiteAttention_add_search_phrase" class="SA_click_counter_add" data-sa-click="SA_Main_PlusButton" title="add keyword">+</button>`;
                    keywordhtml += `<input type="hidden" id="SiteAttention_list_keyword" value="${getPostMeta.join()}">`;
                    $('.SiteAttention_search_phrase_tags').html(keywordhtml);
                    (new SiteAttentionWordPress()).secureRules();
                } else {
                    $('.SiteAttention_keyword_rule_tab_options .tab_options').removeClass('active_tab');
                    $('.SiteAttention_search_phrase_tags').hide();
                    $('.SiteAttention_search_phrase').show();
                    $('.keyword_tab').addClass('active_tab');
                    $('.rules_tab').addClass('disabletab');
                    $('.SiteAttention_add_keyword').show();
                    $('.SiteAttention_score_rules_container').hide();
                    $('.SiteAttention_toggle_score').hide();
                }
            });
        }

        /**
         *
         * @param keywordval
         */
        saveKeywordPostMeta(keywordval)
        {

            if(document.getElementById('SiteAttention_list_keyword') != null) {
                var phrase = document.getElementById('SiteAttention_list_keyword').value.split(',');
                if(phrase.indexOf(keywordval) > -1) {
                    return false;
                }
            }

            var data = {
                action: 'add_postmeta',
                post_id: SiteAttentionInfo.pid,
                page_keyword: keywordval
            };

            jQuery.post(ajaxurl, data, function(response) {
                (new SiteAttentionWordPress()).getKeyword();
            });
        }

        /**
         *
         * @param keywordval
         */
        removeKeyword(keywordval)
        {
            $('.SiteAttention_keyword_difficulty_result_word').filter(function() {
                if($(this).text() == keywordval) {
                    let selectedKeyword = $(this).attr('id');
                    if(selectedKeyword !== '') {
                        $('.'+selectedKeyword).removeClass('SA_btn_active');
                        $('.'+selectedKeyword).html('Select');
                    }
                }
            });

            var data = {
                action: 'remove_postmeta',
                post_id: SiteAttentionInfo.pid,
                page_keyword: keywordval
            };
            jQuery.post(ajaxurl, data, function(response) {
                (new SiteAttentionWordPress()).getKeyword();
            });
        }

        /**
         *
         */
        secureRules()
        {
            let seo_selector_elems = this.getMap();
            var data_keywords = $("#SiteAttention_list_keyword").val();
            var data_txt = `<div data-sa-scope="metatitle" data-sa-field="MetaTitle" id="title" data-sa-label="Title">${this.posttitleHtml}</div>
                            <div data-sa-scope="metadescription" data-sa-field="MetaDescription" id="excerpt" data-sa-label="Meta Description">${this.postExcerptHtml}</div>
                            <div data-sa-scope="content" data-sa-field="MainBody" id="content" data-sa-label="Content">${this.contentHtml}</div>
                            <div data-sa-scope="headerh1" data-sa-field="PageName" id="title" data-sa-label="Title">${this.posttitleHeader1Html}</div>
                            <div data-sa-scope="headerh1" data-sa-field="MainBody" id="content" data-sa-label="Content area">${this.contentHtml}</div>
                            <div data-sa-scope="headers" data-sa-field="Headers" id="content" data-sa-label="Content area">${this.contentHtml}</div>
                            <div data-sa-scope="url" data-sa-field="Slug" id="post_name" data-sa-label="Slug">${this.postURLHtml}</div>
                            <div data-sa-scope="links" data-sa-field="Links" id="content" data-sa-label="Content area">${this.contentHtml}</div>
                            <div data-sa-scope="images" data-sa-field="Images" id="content" data-sa-label="Content area">${this.featuredImageUrl}</div>`;
            var jsonBody = JSON.stringify({"kwsvalue":"400","country":"DK","content_lang":this.getLang(),"data_txt":data_txt,"data_keywords":data_keywords,"seo_selector_elems":seo_selector_elems,"protocol": "https:","domain": this.getSiteUrl(),"pid": this.getPid(),"cms": this.getCMS(),"username": this.getUser(),"published": this.getPublished(),"dompage": this.getUrl()});
            var url = SiteAttentionInfo.apiUrl+'/secure/rules/'+this.getPid();
            this.xhr.open("POST", url, true);
            this.xhr.setRequestHeader('x-siteattention', SiteAttentionInfo.key);
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            this.xhr.onreadystatechange = function() {
                if((this.readyState == 4 && (this.status==200 || this.status==201))) {
                    var rulesResponse = jQuery.parseJSON(this.responseText);
                    var scorePct = rulesResponse.score_pct;
                    var threshold = SiteAttentionInfo.siteattention_threshold_value;
                    var thresholdMarginLeft = threshold - 2;
                    if (scorePct > threshold || scorePct == threshold) {
                        var barbackgroundColor = '#63bb67';
                        var textcolor = '#63bb67';
                    }
                    else {
                        var barbackgroundColor = '#fd6a69';
                        var textcolor = '#fd6a69';
                    }

                    $('.SiteAttention_score_value').html(rulesResponse.score_pct+'%');
                    $('.SiteAttention_score_bar_percentage').width(rulesResponse.score_pct+'%');
                    $('.SiteAttention_threshold_arrow').css('margin-left',thresholdMarginLeft+'%');
                    $('.SiteAttention_score_bar_percentage').css('background-color',barbackgroundColor);
                    $('.SiteAttention_score_value').css('color',textcolor);
                    //(new SiteAttentionWordPress()).updateRulesBar(rulesResponse);
                    (new SiteAttentionWordPress()).getRulesContainer(rulesResponse);
                    (new SiteAttentionWordPress()).setScore();
                    (new SiteAttentionWordPress()).getRegionDatabaseByKey('prim');
                    (new SiteAttentionWordPress()).getRegionDatabaseByKey('sec');
                    (new SiteAttentionWordPress()).setReadabilityBar(rulesResponse.readability);
                }
            };
            this.xhr.send(jsonBody);
        }

        setReadabilityBar(pageReadability)
        {
            var url = SiteAttentionInfo.apiUrl+'/text/readability/'+this.cmslang;
            this.xhr.open("GET", url, true);
            this.xhr.setRequestHeader('x-siteattention', SiteAttentionInfo.key);
            this.xhr.onreadystatechange = function() {
                if((this.readyState == 4 && (this.status==200 || this.status==201))) {
                    var readabilityResponse = jQuery.parseJSON(this.responseText);
                    var easy_min = readabilityResponse[0].interval_min;
                    var easy_max = readabilityResponse[0].interval_max; var easy_text = readabilityResponse[0].interval_descr;
                    var medium_max = readabilityResponse[1].interval_max; var medium_text = readabilityResponse[1].interval_descr;
                    var high_max = readabilityResponse[2].interval_max; var high_text = readabilityResponse[2].interval_descr;

                    var percentage = 0;
                    if (pageReadability < high_max) {
                        percentage = pageReadability / high_max * 100;
                    } else {
                        percentage = 100;
                    }

                    var span1width = (easy_max - easy_min) / high_max * 100;
                    var span2width = (medium_max - easy_max) / high_max * 100;
                    var span3width = (high_max - medium_max) / high_max * 100;

                    $('.SiteAttention_readability_bar_background_span1,.SiteAttention_readability_bar_scaleMark1').css('width',`${span1width}%`);
                    $('.SiteAttention_readability_bar_background_span2,.SiteAttention_readability_bar_scaleMark2').css('width',`${span2width}%`);
                    $('.SiteAttention_readability_bar_background_span3,.SiteAttention_readability_bar_scaleMark3').css('width',`${span3width}%`);

                    $('.SiteAttention_readability_bar_percentage').css('width',`${percentage}%`);

                    if (pageReadability < easy_max) {
                        $('.SiteAttention_readability_score').text(easy_text);
                        $('.SiteAttention_readability_bar_percentage').css('background-color','rgba(65, 221, 137, 0.6)');
                        $('.SiteAttention_readability_score').css('color','rgba(65, 221, 137, 1)');
                        $('.SiteAttention_readability_bar_percentage_span1').css('width','0%');
                        $('.SiteAttention_readability_bar_percentage_span2').css('width','0%');
                        $('.SiteAttention_readability_bar_percentage_span3').css('width','0%');
                        $('.SiteAttention_readability_bar_percentage_span1').css('background-color','transparent');
                        $('.SiteAttention_readability_bar_percentage_span2').css('background-color','transparent');
                        $('.SiteAttention_readability_bar_percentage_span3').css('background-color','transparent');
                    } else if (pageReadability > easy_max && pageReadability <= medium_max) {
                        $('.SiteAttention_readability_score').text(medium_text);
                        var diff = percentage - span1width;
                        $('.SiteAttention_readability_bar_percentage_span1').css('width',`${span1width}%`);
                        $('.SiteAttention_readability_bar_percentage_span2').css('width',`${diff}%`);
                        $('.SiteAttention_readability_bar_percentage_span3').css('width','0%');
                        $('.SiteAttention_readability_bar_percentage').css('background-color','transparent');
                        $('.SiteAttention_readability_bar_percentage_span1').css('background-color','rgba(65, 221, 137, 0.6)');
                        $('.SiteAttention_readability_bar_percentage_span2').css('background-color','rgba(246, 143, 70, 0.6)');
                        $('.SiteAttention_readability_bar_percentage_span3').css('background-color','transparent');
                        $('.SiteAttention_readability_score').css('color','rgba(246, 143, 70, 1)');
                    } else if (pageReadability > medium_max) {
                        $('.SiteAttention_readability_score').text(high_text);
                        var diff = percentage - (span1width + span2width);
                        $('.SiteAttention_readability_bar_percentage_span1').css('width',`${span1width}%`);
                        $('.SiteAttention_readability_bar_percentage_span2').css('width',`${span2width}%`);
                        $('.SiteAttention_readability_bar_percentage_span3').css('width',`${diff}%`);
                        $('.SiteAttention_readability_bar_percentage').css('background-color','transparent');
                        $('.SiteAttention_readability_bar_percentage_span1').css('background-color','rgba(65, 221, 137, 0.6)');
                        $('.SiteAttention_readability_bar_percentage_span2').css('background-color','rgba(246, 143, 70, 0.6)');
                        $('.SiteAttention_readability_bar_percentage_span3').css('background-color','rgba(195,0 ,47, 0.6)');
                        $('.SiteAttention_readability_score').css('color','rgba(195, 0, 47, 1)');
                    }
                }
            };
            this.xhr.send();
        }

        /**
         *
         * @param response
         */
        getRulesContainer(rulesResponse)
        {
            var activeIdArray = [];
            jQuery('.SiteAttention_accordion.SA_click_counter.SA_active').each(function() {
                activeIdArray.push(this.id);
            });

            let rulesHtml = `<span class="SiteAttention_rules_label">SEO Rules</span>
                             <div class="SiteAttention_rules">`;
            $.each(rulesResponse.rule_categories, function(key, value){
                let scorePct = Math.round(value.score_pct);
                let svgBackgroundColor = '';
                if(scorePct > 70) {
                    svgBackgroundColor = '#63bb67';
                } else {
                    svgBackgroundColor = '#fd6a69';
                }

                let svgTextPosition = '';
                if(scorePct == 100 ) {
                    svgTextPosition = 1;
                } else if(scorePct >= 0 &&  scorePct <= 9) {
                    svgTextPosition = 9;
                } else {
                    svgTextPosition = 5;
                }

                rulesHtml += `<button type="button" id="SiteAttention_rules_cat_${value.id}" class="SiteAttention_accordion SA_click_counter" data-sa-click="SA_Main_cat_${value.name}">
                                <div id="SiteAttention_rules_cat_${value.id}_pie" class="SA_pie">
                                    <svg viewBox="0 0 32 32" style="background: ${svgBackgroundColor}">
                                        <title>${scorePct}%</title>
                                        <!--<circle r="16" cx="16" cy="16" stroke-dasharray="${scorePct} 100"></circle>-->
                                        <text x="${svgTextPosition}" y="-11" fill="#fff" style="transform: rotate(90deg);font-size: 12px;">${scorePct}%</text>
                                    </svg>
                                </div>
                                <span id="SiteAttention_rules_cat_1_label_text">${value.name}</span>
                                    <div class="SA_accordion_arrow">
                                        <i class="SA_down_arrow"></i>
                                    </div>
                              </button>
                              <div id="SiteAttention_rules_cat_${value.id}_container" class="SiteAttention_panel">`;
                                $.each(value.rules, function(key, value){
                                    var checkFlag = '';
                                    var crossFlag = '';
                                    if(value.score_pct == 100) {
                                        var checkFlag = 'display:block';
                                    } else {
                                        var crossFlag = 'display:block';
                                    }
                                    rulesHtml += `<div class="SiteAttention_rule" id="SiteAttention_rule_${value.id}">
                                                    <div class="SiteAttention_tooltip_content">
                                                        <div class="SiteAttention_rule_text">
                                                            <div class="SiteAttention_rule_long_description">${value.long_description}</div>
                                                            <div class="SiteAttention_piechart_container">
                                                                <div class="SiteAttention_piechart_check" style="${checkFlag}"></div>
                                                                <div class="SiteAttention_piechart_cross" style="${crossFlag}">&#10006;</div>
                                                            </div>
                                                            <div class="SiteAttention_rule_variable_text">${value.status_description}</div>
                                                        </div>
                                                    </div>
                                                  </div>`;
                                });
                rulesHtml += `</div>`;
            });
            rulesHtml += `</div>`;
            $('.SiteAttention_rules_container').html(rulesHtml);
            $.each( activeIdArray, function( key, value ) {
                $('#'+value+'_container').slideToggle('slow');
                $('#'+value).toggleClass('SA_active');
            });
        }

        /**
         * Adjusts the height of the container div
         */
        setContainerHeight( container, wpcontent )
        {
            let wpHtmlContainer = document.querySelector( "html.wp-toolbar" ),
                wpHtmlContainerStyle = window.getComputedStyle( wpHtmlContainer, null ),
                wpHtmlContainerStylePaddingTop = wpHtmlContainerStyle.paddingTop,
                topPos = Number( wpHtmlContainerStylePaddingTop.slice( 0, 2 ) ),
                height = window.innerHeight - topPos;

            container.style.height = `${height}px`;
        }

        /**
         * Get Region list from semrush
         */
        getRegionDatabaseByKey(type)
        {
            var jsonBody = JSON.stringify({"type":type});
            var url = SiteAttentionInfo.apiUrl+'/sr/databasesbykey';
            this.xhr.open("POST", url, true);
            this.xhr.setRequestHeader('x-siteattention', SiteAttentionInfo.key);
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            this.xhr.onreadystatechange = function() {
                if((this.readyState === 4 && (this.status === 200 || this.status === 201))) {
                    let regionResponse = jQuery.parseJSON(this.responseText);
                    let html = '';
                    $.each(regionResponse, function(key, value){
                        html += "<option value=" + key + " >" + value + "</option>";
                    });

                    if(html.length > 0) {
                        document.getElementById('SiteAttention_regions_list_' + type).innerHTML = html;
                    }
                }
            };
            this.xhr.send(jsonBody);
        }

        /**
         * Get Keyword search result
         */
        getKeywordSearchResults(searchType)
        {
            $("#SiteAttention_keytool_results").hide();
            $('#SiteAttention_keyword_difficulty_search_loading').show();
            let searchPhrase = $.trim($('#SiteAttention_keyword_difficulty_phrase').val());
            let selectedRegion = $('#SiteAttention_keyword_difficulty_region').val();
            let domainPage = this.getUrl();

            if(searchPhrase !== '' && searchPhrase !== undefined) {
                var jsonBody = JSON.stringify({"phrase":searchPhrase,"region":selectedRegion,"domain":domainPage,"license":SiteAttentionInfo.key,"username":this.getUser(),"contentLanguage":this.getLang()});

                var url = SiteAttentionInfo.apiUrl+'/sr/'+searchType;
                this.xhr.open("POST", url, true);
                this.xhr.setRequestHeader('x-siteattention', SiteAttentionInfo.key);
                this.xhr.setRequestHeader('Content-Type', 'application/json');
                this.xhr.onreadystatechange = function() {
                    if((this.readyState === 4 && (this.status === 200 || this.status === 201))) {
                        let keywordSearchResults = jQuery.parseJSON(this.responseText);
                        let keywordSearchResultsHtml = '';
                        $.each(keywordSearchResults, function(key, value){
                            var kdiValue = Math.round(value.Kd);
                            keywordSearchResultsHtml += `<div class="SiteAttention_keyword_difficulty_result">
                                    <div class="SiteAttention_keyword_difficulty_result_word_competition_container">
                                    <div class="SiteAttention_keyword_difficulty_result_word" id="keyword_search_${key}">${value.Ph}</div>
                                        <div class="SiteAttention_keyword_difficulty_result_competition_container">
                                            <div class="SiteAttention_keyword_difficulty_result_competition_background"></div>
                                            <div class="SiteAttention_keyword_difficulty_result_competition_bar" style="width: ${kdiValue}%;"></div>
                                            <div class="SiteAttention_keyword_difficulty_result_kdi" title="Keyword Difficulty Index">
                                                KDI&nbsp;<span>${kdiValue}%</span>
                                            </div>
                                        </div>
                                        <div class="SiteAttention_keyword_difficulty_result_number" title="Monthly Searches">
                                            MS:&nbsp;
                                            <span>${value.Nq}</span>
                                        </div>
                                    </div>
                                    <div class="SiteAttention_keyword_difficulty_use_it SA_click_counter keyword_search_${key}" data-sa-click="SA_Main_KeywordSearch_UseItButton">Select</div>
                                </div>`;
                        });

                        if(keywordSearchResultsHtml.length > 0) {
                            $("#SiteAttention_keytool_results").show();
                            $('#SiteAttention_keyword_difficulty_search_loading').hide();
                            document.getElementById('SiteAttention_keytool_results').innerHTML = keywordSearchResultsHtml;
                        }
                    }
                };
                this.xhr.send(jsonBody);
            }
            else {
                $("#SiteAttention_keytool_results").show();
                $('#SiteAttention_keyword_difficulty_search_loading').hide();
                document.getElementById('SiteAttention_keytool_results').innerHTML = 'Empty Search! try again!';
            }

        }

        /**
         * Initiate SiteAttention script
         */
        init()
        {
            // Show SiteAttention on the page
            this.getContainer();

            // Various UI conveniences
            this.onShow();
            this.permalinkEvent();
        }
    };

    $(window).load(function()
    {
        (new SiteAttentionWordPress()).init();
        $('.SiteAttention_keyword_rule_tab_options .tab_options').click(function(){
            $('.SiteAttention_keyword_rule_tab_options .tab_options').removeClass('active_tab');
            $(this).addClass('active_tab');
            $('.tabs_view').hide();
            $('.'+$(this).attr('id')).show();
        });

        document.getElementById('SiteAttention_search_phrase').onkeyup = function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                var keywordval = document.getElementById('SiteAttention_search_phrase').value;
                (new SiteAttentionWordPress()).saveKeywordPostMeta(keywordval);
                return false;
            }
        };

        if(jQuery('#postdivrich .wp-core-ui.tmce-active').length == 1) {
            var iframe  = document.getElementById('content_ifr');
            var iframeWindow = iframe.contentWindow;

            iframeWindow.onblur = function(){
                var getKeywordVal = $('#SiteAttention_list_keyword').val();
                if(getKeywordVal != undefined && getKeywordVal != '') {
                    (new SiteAttentionWordPress()).secureRules();
                    (new SiteAttentionWordPress()).setScore();
                }
            };
        }
    });



    $("body").on("keydown",$("form#post"), function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            //console.log(e);
            return false;
        }
    });

    $(document).on("click", ".SiteAttention_accordion", function(e){
        var getid = $(this).attr('id');
        $('#'+getid+'_container').slideToggle('slow');
        $(this).toggleClass('SA_active');
    });

    $(document).on("keyup", ".SA_add_keyword_input", function(e){
        if (e.keyCode === 13) {
            var keywordval = $(this).val();
            (new SiteAttentionWordPress()).saveKeywordPostMeta(keywordval);
            e.preventDefault();
        }
    });

    $(document).on("click", ".SA_keyword_tag_delete", function(e){
        $(this).closest('.SiteAttention_keyword_tags').remove();
        (new SiteAttentionWordPress()).removeKeyword($(this).closest('.SiteAttention_keyword_tags').find('span').html());
    });

    $(document).on("click", "#SiteAttention_keyword_difficulty_btn,#SiteAttention_KD_title_close", function(e){
        $('#SiteAttention_keyword_difficulty_phrase').val($('.SiteAttention_search_phrase_tags .SiteAttention_keyword_tags span').html());
        $('#SiteAttention_keyword_difficulty_btn').toggleClass('keyword_btn_active');
        $('#SiteAttention_keyword_difficulty').toggle();
        //$('.SiteAttention_rules_container').toggle();
    });

    $(document).on("click", ".SA_btn-group button", function(e){
        $('.SA_btn-group button').removeClass('SA_KD_active');
        $(this).addClass('SA_KD_active');
    });

    $(document).on("click", "#SiteAttention_keyword_difficulty_search", function(e){
        let searchType = $('.SA_KD_active').attr('data-id');
        (new SiteAttentionWordPress()).getKeywordSearchResults(searchType);
    });

    $(document).on("keyup", "#SiteAttention_keyword_difficulty_phrase", function(e){
        if (e.keyCode === 13) {
            let searchType = $('.SA_KD_active').attr('data-id');
            (new SiteAttentionWordPress()).getKeywordSearchResults(searchType);
        }
    });

    $(document).on("click", ".SiteAttention_keyword_difficulty_use_it", function(e){
        $(this).addClass('SA_btn_active');
        $(this).text('Selected');
        let selectedKeyword = $(this).closest("div.SiteAttention_keyword_difficulty_result").find(".SiteAttention_keyword_difficulty_result_word").html();
        (new SiteAttentionWordPress()).saveKeywordPostMeta(selectedKeyword);
    });

    $(document).on("click", ".SiteAttention_focus_field", function(e){
        var getSaFieldIndex = jQuery(this).attr('data-sa-field-index');
        var getSaFieldId = jQuery(this).attr('data-sa-elem-id');
        if(getSaFieldIndex === 'Content area' && getSaFieldId === 'editor-block-list__block-edit block-editor-block-list__block-edit') {
            if(this.contentHtml !== undefined && this.contentHtml !== '') {
                if(jQuery('.editor-block-list__layout.block-editor-block-list__layout').length === 0) {
                    jQuery('.block-editor-block-list__layout div:first').focus().click();
                } else {
                    jQuery('.editor-block-list__layout.block-editor-block-list__layout div:first').focus().click();
                }
            } else {
                jQuery('.editor-default-block-appender__content.block-editor-default-block-appender__content').focus();
                if(jQuery('.editor-block-list__layout.block-editor-block-list__layout').length === 0) {
                    jQuery('.block-editor-block-list__layout div:first').focus().click();
                } else {
                    jQuery('.editor-block-list__layout.block-editor-block-list__layout div:first').focus().click();
                }
            }
        } else if(getSaFieldId === 'posttoggelURL') {
            if(jQuery('.editor-post-link input').length === 0) {
                wp.data.dispatch( 'core/edit-post').toggleEditorPanelOpened('post-link');
            }
            jQuery('.editor-post-link input').focus();
        } else if(getSaFieldId === 'postYoastMetaTitle') {
            jQuery('.SnippetEditor__EditSnippetButton-sc-1hz1x15-1').click();
            jQuery('#snippet-editor-field-title').focus().click();
        } else if(getSaFieldId === 'postYoastMetaDescription') {
            jQuery('.SnippetEditor__EditSnippetButton-sc-1hz1x15-1').click();
            jQuery('#snippet-editor-field-description').focus().click();
        } else if(getSaFieldId === 'postExcerpt') {
            jQuery('.edit-post-sidebar__panel-tabs li:first-child button').click();
            if(jQuery('.editor-post-excerpt textarea').length === 0) {
                wp.data.dispatch( 'core/edit-post').toggleEditorPanelOpened('post-excerpt');
            }
            jQuery('.editor-post-excerpt textarea').focus();
        } else if((jQuery('#postdivrich .wp-core-ui.tmce-active').length == 1) && getSaFieldId == 'content') {
            document.getElementById('content_ifr').contentDocument.getElementById('tinymce').focus();
        } else {
            jQuery('#'+getSaFieldId).focus();
        }

    });

    $(document).on("click", ".SA_click_counter_add", function(){
        var inputBox = document.createElement('INPUT');
        inputBox.setAttribute('type', 'text');
        inputBox.className = "SA_add_keyword_input";
        inputBox.id = "SiteAttention_search_phrase";
        $('.SA_click_counter_add').hide();
        $('.SiteAttention_search_phrase_tags').append(inputBox);
        $('#SiteAttention_search_phrase').focus();
        $(document).on("blur", "#SiteAttention_search_phrase", function(e){
            $('.SA_add_keyword_input').remove();
            $('.SA_click_counter_add').show();
        });
    });

    $(document).on("change", "#title,#post-title-0,#post-title-1,#content,#post_name, #excerpt,#post-content-0,.editor-post-link input,.editor-post-excerpt textarea", function(){
        var getKeywordVal = $('#SiteAttention_list_keyword').val();
        if(getKeywordVal != undefined && getKeywordVal != '') {
            (new SiteAttentionWordPress()).secureRules();
            (new SiteAttentionWordPress()).setScore();
        }
    });

    $(document).on("blur", ".editor-post-text-editor, #content_ifr,#snippet-editor-field-title,#snippet-editor-field-slug,#snippet-editor-field-description, .editor-block-list__layout.block-editor-block-list__layout .is-selected:first,.block-editor-block-list__layout .is-selected:first", function(){
        var getKeywordVal = $('#SiteAttention_list_keyword').val();
        if(getKeywordVal != undefined && getKeywordVal != '') {
            (new SiteAttentionWordPress()).secureRules();
            (new SiteAttentionWordPress()).setScore();
        }
    });

    $(document).ajaxComplete(function (event,request,settings){
        if (typeof settings.data==='string' && /action=get-post-thumbnail-html/.test(settings.data) && request.responseJSON && typeof request.responseJSON.data==='string') {
            (new SiteAttentionWordPress()).secureRules();
        }
    });

    var editPost = wp.data.select( 'core/editor' ), lastIsSaving = false;
    wp.data.subscribe(function() {
        var isSaving = editPost.isSavingPost();
        if ( isSaving !== lastIsSaving && !isSaving ) {
            var isCurrentPostPublished = editPost.isCurrentPostPublished();
            var isAutosavingPost = editPost.isAutosavingPost();
            if (isCurrentPostPublished && !isAutosavingPost) {
                var getKeywordVal = $('#SiteAttention_list_keyword').val();
                if(getKeywordVal != undefined && getKeywordVal != '') {
                    lastIsSaving = isSaving;
                    SiteAttentionInfo.published = 'publish';
                    (new SiteAttentionWordPress()).secureRules();
                }
            }
        }
        lastIsSaving = isSaving;
    });
} )(jQuery);