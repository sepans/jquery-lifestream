(function(c){var l=function(f){return"http://query.yahooapis.com/v1/public/yql?q=__QUERY__&env=store://datatables.org/alltableswithkeys&format=json".replace("__QUERY__",encodeURIComponent(f))};c.fn.lifestream=function(f){return this.each(function(){var i=c(this),h=jQuery.extend({classname:"lifestream",feedloaded:null,limit:10,list:[]},f),a={count:h.list.length,items:[]},d=jQuery.extend(true,{},h),b=function(e){c.merge(a.items,e);a.items.sort(function(n,o){return o.date-n.date});e=a.items;for(var j=
e.length<h.limit?e.length:h.limit,k=0,m,p=c('<ul class="'+h.classname+'"/>');k<j;k++){m=e[k];m.html&&c('<li class="'+h.classname+"-"+m.config.service+'">').append(m.html).appendTo(p)}i.html(p);c.isFunction(h.feedloaded)&&h.feedloaded()},g=function(){var e=0,j=h.list.length;for(delete d.list;e<j;e++){var k=h.list[e];if(c.fn.lifestream.feeds[k.service]&&c.isFunction(c.fn.lifestream.feeds[k.service])&&k.user){k._settings=d;c.fn.lifestream.feeds[k.service](k,b)}}};jQuery.tmpl?g():jQuery.getScript("https://raw.github.com/jquery/jquery-tmpl/master/jquery.tmpl.min.js",
g)})};c.fn.lifestream.feeds=c.fn.lifestream.feeds||{};c.fn.lifestream.feeds.blogger=function(f,i){var h=c.extend({},{posted:'posted <a href="${origLink}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://'+f.user+'.blogspot.com/feeds/posts/default"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e,j,k;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.feed.entry){a=a.query.results.feed.entry;for(g=a.length;b<g;b++){e=a[b];if(!e.origLink){j=0;for(k=e.link.length;j<
k;j++)if(e.link[j].rel==="alternate")e.origLink=e.link[j].href}if(e.origLink){if(e.title.content)e.title=e.title.content;d.push({date:new Date(e.published),config:f,html:c.tmpl(h.posted,e)})}}}i(d)}});return{template:h}};c.fn.lifestream.feeds.dailymotion=function(f,i){var h=c.extend({},{uploaded:'uploaded a video <a href="${link}">${title[0]}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://www.dailymotion.com/rss/user/'+f.user+'"'),dataType:"jsonp",success:function(a){var d=[],
b=0,g,e;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss.channel.item){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.uploaded,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.delicious=function(f,i){var h=c.extend({},{bookmarked:'bookmarked <a href="${u}">${d}</a>'},f.template);c.ajax({url:"http://feeds.delicious.com/v2/json/"+f.user,dataType:"jsonp",success:function(a){var d=[],b=0,g;if(a&&a.length&&
a.length>0)for(g=a.length;b<g;b++){var e=a[b];d.push({date:new Date(e.dt),config:f,html:c.tmpl(h.bookmarked,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.deviantart=function(f,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select title,link,pubDate from rss where url="http://backend.deviantart.com/rss.xml?q=gallery%3A'+encodeURIComponent(f.user)+'&type=deviation" | unique(field="title")'),dataType:"jsonp",success:function(a){var d=[],b,g=
0,e;if(a.query&&a.query.count>0){a=a.query.results.item;for(e=a.length;g<e;g++){b=a[g];d.push({date:new Date(b.pubDate),config:f,html:c.tmpl(h.posted,b)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.dribbble=function(f,i){var h=c.extend({},{posted:'posted a shot <a href="${url}">${title}</a>'},f.template);c.ajax({url:"http://api.dribbble.com/players/"+f.user+"/shots",dataType:"jsonp",success:function(a){var d=[],b=0,g;if(a&&a.total)for(g=a.shots.length;b<g;b++){var e=a.shots[b];d.push({date:new Date(e.created_at),
config:f,html:c.tmpl(h.posted,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.flickr=function(f,i){var h=c.extend({},{posted:'posted a photo <a href="${link}">${title}</a>'},f.template);c.ajax({url:"http://api.flickr.com/services/feeds/photos_public.gne?id="+f.user+"&lang=en-us&format=json",dataType:"jsonp",jsonp:"jsoncallback",success:function(a){var d=[],b=0,g;if(a&&a.items&&a.items.length>0)for(g=a.items.length;b<g;b++){var e=a.items[b];d.push({date:new Date(e.published),config:f,html:c.tmpl(h.posted,
e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.foomark=function(f,i){var h=c.extend({},{bookmarked:'bookmarked <a href="${url}">${url}</a>'},f.template);c.ajax({url:"http://api.foomark.com/urls/list/",data:{format:"jsonp",username:f.user},dataType:"jsonp",success:function(a){var d=[],b=0,g;if(a&&a.length&&a.length>0)for(g=a.length;b<g;b++){var e=a[b];d.push({date:new Date(e.created_at.replace(" ","T")),config:f,html:c.tmpl(h.bookmarked,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.formspring=
function(f,i){var h=c.extend({},{answered:'answered a question <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://www.formspring.me/profile/'+f.user+'.rss"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss.channel.item){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.answered,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.forrst=
function(f,i){var h=c.extend({},{posted:'posted a ${post_type} <a href="${post_url}">${title}</a>'},f.template);c.ajax({url:"http://forrst.com/api/v2/users/posts?username="+f.user,dataType:"jsonp",success:function(a){var d=[],b=0,g;if(a&&a.resp.length&&a.resp.length>0)for(g=a.resp.length;b<g;b++){var e=a.resp[b];d.push({date:new Date(e.created_at.replace(" ","T")),config:f,html:c.tmpl(h.posted,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.foursquare=function(f,i){var h=c.extend({},{checkedin:'checked in @ <a href="${link}">${title}</a>'},
f.template);c.ajax({url:l('select * from rss where url="https://feeds.foursquare.com/history/'+f.user+'.rss"'),dataType:"jsonp",success:function(a){var d=[],b=0,g;if(a.query&&a.query.count&&a.query.count>0)for(g=a.query.count;b<g;b++){var e=a.query.results.item[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.checkedin,e)})}i(d)}});return{template:h}};c.fn.lifestream.feeds.github=function(f,i){var h=c.extend({},{pushed:'<a href="${status.url}" title="{{if title}}${title} by ${author} {{/if}}">pushed</a> to <a href="http://github.com/${repo}">${repo}</a>',
gist:'<a href="${status.payload.url}" title="${status.payload.desc || ""}">${status.payload.name}</a>',commented:'<a href="${status.url}">commented</a> on <a href="http://github.com/${repo}">${repo}</a>',pullrequest:'<a href="${status.url}">${status.payload.action}</a> pull request on <a href="http://github.com/${repo}">${repo}</a>',created:'created ${status.payload.ref_type || status.payload.object} <a href="${status.url}">${status.payload.ref || status.payload.object_name}</a> for <a href="http://github.com/${repo}">${repo}</a>',
createdglobal:'created ${status.payload.object} <a href="${status.url}">${title}</a>',deleted:'deleted ${status.payload.ref_type} <a href="http://github.com/${status.repository.owner}/${status.repository.name}">status.payload.ref</a>'},f.template),a=function(b){return b.payload.repo||(b.repository?b.repository.owner+"/"+b.repository.name:null)||b.url.split("/")[3]+"/"+b.url.split("/")[4]},d=function(b){var g;if(b.type==="PushEvent"){g=b.payload&&b.payload.shas&&b.payload.shas.json&&b.payload.shas.json[2];
a(b);return c.tmpl(h.pushed,{status:b,title:g,author:g?b.payload.shas.json[3]:"",repo:a(b)})}else if(b.type==="GistEvent")return c.tmpl(h.gist,{status:b});else if(b.type==="CommitCommentEvent"||b.type==="IssueCommentEvent"){g=a(b);return c.tmpl(h.commented,{repo:g,status:b})}else if(b.type==="PullRequestEvent"){g=a(b);return c.tmpl(h.pullrequest,{repo:g,status:b})}else if(b.type==="CreateEvent"&&(b.payload.ref_type==="tag"||b.payload.ref_type==="branch"||b.payload.object==="tag")){g=a(b);return c.tmpl(h.created,
{repo:g,status:b})}else if(b.type==="CreateEvent"){g=b.payload.object_name==="null"?b.payload.name:b.payload.object_name;return c.tmpl(h.createdglobal,{title:g,status:b})}else if(b.type==="DeleteEvent")return c.tmpl(h.deleted,b)};c.ajax({url:l('select json.repository.owner,json.repository.name,json.payload,json.type,json.url, json.created_at from json where url="http://github.com/'+f.user+'.json"'),dataType:"jsonp",success:function(b){var g=[],e=0,j;if(b.query&&b.query.count&&b.query.count>0)for(j=
b.query.count;e<j;e++){var k=b.query.results.json[e].json;g.push({date:new Date(k.created_at),config:f,html:d(k)})}i(g)}});return{template:h}};c.fn.lifestream.feeds.googlereader=function(f,i){var h=c.extend({},{starred:'starred post <a href="${link.href}">${title.content}</a>'},f.template);c.ajax({url:l('select * from xml where url="www.google.com/reader/public/atom/user%2F'+f.user+'%2Fstate%2Fcom.google%2Fstarred"'),dataType:"jsonp",success:function(a){var d=[],b=0,g;if(a.query&&a.query.count&&a.query.count>
0){a=a.query.results.feed.entry;for(g=a.length;b<g;b++){var e=a[b];d.push({date:new Date(parseInt(e["crawl-timestamp-msec"],10)),config:f,html:c.tmpl(h.starred,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.instapaper=function(f,i){var h=c.extend({},{loved:'loved <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://www.instapaper.com/starred/rss/'+f.user+'"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>
0&&a.query.results.rss.channel.item){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.loved,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.iusethis=function(f,i){var h=c.extend({},{global:'${action} <a href="${link}">${what}</a> on (${os})'},f.template);c.ajax({url:l('select * from xml where url="http://iphone.iusethis.com/user/feed.rss/'+f.user+'" or url="http://osx.iusethis.com/user/feed.rss/'+f.user+'" or url="http://win.iusethis.com/user/feed.rss/'+
f.user+'"'),dataType:"jsonp",success:function(a){var d=[],b,g,e,j,k,m=0,p,n,o,q,r,s,t=["iPhone","OS X","Windows"];if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss){p=a.query.results.rss.length;q=["started using","stopped using","stopped loving","Downloaded","commented on","updated entry for","started loving","registered"];for(k=q.length;m<p;m++){s=t[m];b=a.query.results.rss[m].channel.item;g=0;for(e=b.length;g<e;g++){n=b[g];o=n.title.replace(f.user+" ","");for(j=0;j<k;j++)if(o.indexOf(q[j])>
-1){r=q[j];break}j=o.split(r);d.push({date:new Date(n.pubDate),config:f,html:c.tmpl(h.global,{action:r.toLowerCase(),link:n.link,what:j[1],os:s})})}}}i(d)}});return{template:h}};c.fn.lifestream.feeds.lastfm=function(f,i){var h=c.extend({},{loved:'loved <a href="${url}">${name}</a> by <a href="${artist.url}">${artist.name}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://ws.audioscrobbler.com/2.0/user/'+f.user+'/lovedtracks.xml"'),dataType:"jsonp",success:function(a){var d=[],b=
0,g;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.lovedtracks&&a.query.results.lovedtracks.track){a=a.query.results.lovedtracks.track;for(g=a.length;b<g;b++){var e=a[b];d.push({date:new Date(parseInt(e.date.uts*1E3,10)),config:f,html:c.tmpl(h.loved,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.mlkshk=function(f,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://mlkshk.com/user/'+f.user+'/rss"'),
dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss.channel.item){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.posted,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.picplz=function(f,i){var h=c.extend({},{uploaded:'uploaded <a href="${url}">${title}</a>'},f.template);c.ajax({url:"http://picplz.com/api/v2/user.json?username="+f.user+"&include_pics=1",
dataType:"jsonp",success:function(a){var d=[],b=0,g;if((g=a.value.users[0].pics)&&g.length&&g.length>0)for(a=g.length;b<a;b++){var e=g[b];d.push({date:new Date(e.date*1E3),config:f,html:c.tmpl(h.uploaded,{url:e.pic_files["640r"].img_url,title:e.caption||e.id})})}i(d)}});return{template:h}};c.fn.lifestream.feeds.pinboard=function(f,i){var h=c.extend({},{bookmarked:'bookmarked <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://feeds.pinboard.in/rss/u:'+f.user+
'"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>0){a=a.query.results.RDF.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.date),config:f,html:c.tmpl(h.bookmarked,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.posterous=function(f,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://'+f.user+'.posterous.com/rss.xml"'),dataType:"jsonp",success:function(a){var d=
[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss.channel.item){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.posted,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.reddit=function(f,i){var h=c.extend({},{commented:'<a href="http://www.reddit.com/r/${item.data.subreddit}/comments/${item.data.link_id.substring(3)}/u/${item.data.name.substring(3)}?context=3">commented (${score})</a> in <a href="http://www.reddit.com/r/${item.data.subreddit}">${item.data.subreddit}</a>',
created:'<a href="http://www.reddit.com${item.data.permalink}">created new thread (${score})</a> in <a href="http://www.reddit.com/r/${item.data.subreddit}">${item.data.subreddit}</a>'},f.template),a=function(d){var b=d.data.ups-d.data.downs;b={item:d,score:b>0?"+"+b:b};if(d.kind==="t1")return c.tmpl(h.commented,b);else if(d.kind==="t3")return c.tmpl(h.created,b)};c.ajax({url:"http://www.reddit.com/user/"+f.user+".json",dataType:"jsonp",jsonp:"jsonp",success:function(d){var b=[],g=0,e;if(d&&d.data&&
d.data.children&&d.data.children.length>0)for(e=d.data.children.length;g<e;g++){var j=d.data.children[g];b.push({date:new Date(j.data.created*1E3),config:f,html:a(j)})}i(b)}});return{template:h}};c.fn.lifestream.feeds.slideshare=function(f,i){var h=c.extend({},{uploaded:'uploaded a presentation <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://www.slideshare.net/rss/user/'+f.user+'"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&
a.query.count>0){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.uploaded,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.snipplr=function(f,i){var h=c.extend({},{posted:'posted a snippet <a href="${link}">${title}</a>'},f.template);c.ajax({url:l('select * from xml where url="http://snipplr.com/rss/users/'+f.user+'"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss.channel.item){a=
a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.posted,e)})}}i(d)}})};c.fn.lifestream.feeds.stackoverflow=function(f,i){var h=c.extend({},{global:'<a href="${link}">${text}</a> - ${title}'},f.template),a=function(d){var b="",g="",e="",j="http://stackoverflow.com/users/"+f.user;if(d.timeline_type==="badge"){b=d.timeline_type+" "+d.action+": "+d.description;g=d.detail;e=j+"?tab=reputation"}else if(d.timeline_type==="revision"||
d.timeline_type==="comment"||d.timeline_type==="accepted"||d.timeline_type==="askoranswered"){b=d.post_type+" "+d.action;g=d.detail||d.description||"";e="http://stackoverflow.com/questions/"+d.post_id}return{link:e,title:g,text:b}};c.ajax({url:"http://api.stackoverflow.com/1.1/users/"+f.user+"/timeline?jsonp",dataType:"jsonp",jsonp:"jsonp",success:function(d){var b=[],g=0,e;if(d&&d.total&&d.total>0&&d.user_timelines)for(e=d.user_timelines.length;g<e;g++){var j=d.user_timelines[g];b.push({date:new Date(j.creation_date*
1E3),config:f,html:c.tmpl(h.global,a(j))})}i(b)}});return{template:h}};c.fn.lifestream.feeds.tumblr=function(f,i){var h=c.extend({},{posted:'posted a ${type} <a href="${url}">${title}</a>'},f.template),a=function(d,b){return{date:new Date(b.date),config:d,html:c.tmpl(h.posted,{type:b.type,url:b.url,title:(b["regular-title"]||b["quote-text"]||b["conversation-title"]||b["photo-caption"]||b["video-caption"]||b["audio-caption"]||b["regular-body"]||b["link-text"]||b.type||"").replace(/<.+?>/gi," ")})}};
c.ajax({url:l('select * from tumblr.posts where username="'+f.user+'"'),dataType:"jsonp",success:function(d){var b=[],g=0,e,j;if(d.query&&d.query.count&&d.query.count>0)if(c.isArray(d.query.results.posts.post))for(e=d.query.results.posts.post.length;g<e;g++){j=d.query.results.posts.post[g];b.push(a(f,j))}else c.isPlainObject(d.query.results.posts.post)&&b.push(a(f,d.query.results.posts.post));i(b)}});return{template:h}};c.fn.lifestream.feeds.twitter=function(f,i){var h=c.extend({},{posted:"{{html tweet}}"},
f.template),a=function(d){return function(b){return b.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,function(g,e,j){return e+'<a href="http://search.twitter.com/search?q=%23'+j+'">#'+j+"</a>"})}(function(b){return b.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,function(g,e,j){return e+'<a href="http://twitter.com/'+j+'">@'+j+"</a>"})}(function(b){return b.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,function(g){return'<a href="'+g+'">'+(g.length>25?g.substr(0,24)+"...":g)+"</a>"})}(d)))};
c.ajax({url:l('select status.id, status.created_at, status.text from twitter.user.timeline where screen_name="'+f.user+'"'),dataType:"jsonp",success:function(d){var b=[],g=0,e;if(d.query&&d.query.count&&d.query.count>0)for(e=d.query.count;g<e;g++){var j=d.query.results.statuses[g].status;b.push({date:new Date(j.created_at),config:f,html:c.tmpl(h.posted,{tweet:a(j.text)})})}i(b)}});return{template:h}};c.fn.lifestream.feeds.vimeo=function(f,i){var h=c.extend({},{posted:'posted <a href="${url}" title="${description}">${title}</a>'},
f.template);c.ajax({url:"http://vimeo.com/api/v2/"+f.user+"/videos.json",dataType:"jsonp",crossDomain:true,success:function(a){var d=[],b=0,g,e;if(a)for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.upload_date.replace(" ","T")),config:f,html:c.tmpl(h.posted,{url:e.url,description:e.description.replace(/"/g,"'").replace(/<.+?>/gi,""),title:e.title})})}i(d)}});return{template:h}};c.fn.lifestream.feeds.wordpress=function(f,i){var h=c.extend({},{posted:'posted <a href="${link}">${title}</a>'},f.template);
c.ajax({url:l('select * from xml where url="http://'+f.user+'.wordpress.com/feed"'),dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.query&&a.query.count&&a.query.count>0&&a.query.results.rss.channel.item){a=a.query.results.rss.channel.item;for(g=a.length;b<g;b++){e=a[b];d.push({date:new Date(e.pubDate),config:f,html:c.tmpl(h.posted,e)})}}i(d)}});return{template:h}};c.fn.lifestream.feeds.youtube=function(f,i){var h=c.extend({},{favorited:'favorited <a href="${video.player.default}" title="${video.description}">${video.title}</a>'},
f.template);c.ajax({url:"http://gdata.youtube.com/feeds/api/users/"+f.user+"/favorites?v=2&alt=jsonc",dataType:"jsonp",success:function(a){var d=[],b=0,g,e;if(a.data&&a.data.items)for(g=a.data.items.length;b<g;b++){e=a.data.items[b];d.push({date:new Date(e.created),config:f,html:c.tmpl(h.favorited,e)})}i(d)}});return{template:h}}})(jQuery);
