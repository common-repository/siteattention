/**
 * @file
 * Script for the SiteAttention settings page.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function(event){

    ! function saInjectSettings(data){
        var id = 'SiteAttentionSettingsScript'
        ,   url = data.apiUrl + 'settings.js?'
        ,   script = document.getElementById(id)
                ? document.getElementById(id)
                : document.createElement('script')
        ,   cb = function (event) {
                document.readyState === 'complete' || document.readyState === 'interactive'
                    ?   init()
                    :   document.addEventListener('DOMContentLoaded', init);
            }
        ,   init = function () {
                new SiteAttentionSettings(data);
            };

        script.id ? cb() : null;

        script.type = 'text/javascript';
        script.src = url;
        script.id = id;

        script.addEventListener('load', cb, false);

        document.body.appendChild(script);
    }
    ( {
        apiUrl: SiteAttentionSettingsData.apiUrl,
        containerSelector: '#SiteAttentionSettings',
        cms: 'WordPress',
        saVersion: SiteAttentionSettingsData.version,
        cmsUrl: SiteAttentionSettingsData.cmsUrl,
        cmsHeaders:
        {
            'Content-type': 'application/json'
        },
        settings:
        {
            key: SiteAttentionSettingsData.key,
            iid: SiteAttentionSettingsData.iid,
            iname: SiteAttentionSettingsData.iname,
            locked: SiteAttentionSettingsData.locked
        }
    } );

});