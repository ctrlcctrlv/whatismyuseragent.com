import { siggy, email, furryfox } from "./img.mjs";
import { toTitleCase } from "./util.mjs";

export const escapeHtml = (html) => {
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return html.replace(/[&<>"']/g, match => htmlEntities[match]);
};

export function HTMLheadersTable(headers) {
  let html = '<table class="headers">';

  Object.keys(headers).forEach((key) => {
    if (key === "user-agent" || key === "x-cloudfront" || key === "host" || key === "via") return;
    if (key.slice(0,5) === "x-amz") return;
    if (key.slice(0,10) === "cloudfront") return;
    const prettyKey = toTitleCase(key.replace(/-/g, ' ')).replace(/\s/g, '-');
    html += '<tr><th>' + escapeHtml(prettyKey) + '</th><td>' + escapeHtml(headers[key]) + '</td></tr>';
  });

  html += '</table>';
  return html;
}

export const HTML = (ua, extra = {}) => `
<!doctype html>
<html lang="en">
    <head>
        <meta name="og:title" content="What is my User Agent?" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:description" content="A User Agent is a unique identifier for your web browser. This tool will help you identify your user agent and browser." />
        <meta name="og:url" content="https://whatismyuseragent.com/" />
        <meta name="twitter:title" content="What is my User Agent?" />
        <meta name="twitter:description" content="A User Agent is a unique identifier for your web browser. This tool will help you identify your user agent and browser." />
        <title>What is my user agent?</title>
        <style>
            @import url('//s3.whatismyuseragent.com/css/wimua.css');
        </style>
    </head>
    <body>
        <header>
            <h1>Your user agent is…</h1>
        </header>
        <main>
            <div>
                <textarea id="text-box" rows="4" cols="40">${escapeHtml(ua)}</textarea>
            </div>
            <p class="furryfox">No silly, <em>I’m</em> Mozzarrella Furryfox, when it comes to “user agents” you're thinking of my less cool brother, <a href="https://en.wikipedia.org/wiki/Mozilla_Firefox">Mozilla Firefox</a>.</p>
            <img src="${furryfox}" class="furryfox"/>
        </main>
        <main>
            <h2>Other headers</h2>
            ${HTMLheadersTable(extra)}
        </main>
        <hr/>
        <aside>
            <p>A user agent is a string that web browsers and other applications send to web servers to identify themselves. This string typically includes information about the browser's name, version, operating system, and rendering engine. Web servers use this information to optimize content delivery and provide a better user experience. User agents also play a critical role in web analytics, as they help track browser usage and detect potential security threats.</p>

            <hr/>
            
            <h3><a href="https://en.wikipedia.org/wiki/User_agent">User agent</a> § <a href="https://en.wikipedia.org/wiki/User_agent#Use in HTTP">Use in HTTP</a></h3>
            <h5>From Wikipedia, the free encyclopedia</h5>

            <p>In HTTP,<sup id="cite_ref-rfc9110_2-1" class="reference"><a href="#cite_note-rfc9110-2">[2]</a></sup> the <b>User-Agent string</b> is often used for <a href="https://en.wikipedia.org/wiki/Content_negotiation" title="Content negotiation">content negotiation</a>, where the origin server selects suitable content or operating parameters for the response. For example, the User-Agent string might be used by a web server to choose variants based on the known capabilities of a particular version of client software. The concept of content tailoring is built into the HTTP standard in <a rel="nofollow" class="external text" href="https://tools.ietf.org/html/rfc1945#page-46">RFC 1945</a> "for the sake of tailoring responses to avoid particular user agent limitations".</p>
            <p>The User-Agent string is one of the criteria by which Web crawlers may be excluded from accessing certain parts of a website using the <a href="https://en.wikipedia.org/wiki/Robots_Exclusion_Standard" class="mw-redirect" title="Robots Exclusion Standard">Robots Exclusion Standard</a> (<i>robots.txt</i> file).</p>
            <small>
                <ol>
                    <li id="cite_note-rfc9110-2"><span class="mw-cite-backlink"><a class="mw-cite-up-arrow-backlink" aria-label="Jump back up" title="Jump back up" href="#cite_ref-rfc9110_2-1">^</a> <a href="#cite_ref-rfc9110_2-1" class="mw-cite-targeted-backlink"><sup><i><b>b</b></i></sup></a></span> <span class="reference-text"><link rel="mw-deduplicated-inline-style" href="mw-data:TemplateStyles:r1133582631"><cite class="citation web cs1"><a rel="nofollow" class="external text" href="https://www.rfc-editor.org/rfc/rfc9110.html">"RFC-9110: HTTP Semantics"</a>. IETF<span class="reference-accessdate">. Retrieved <span class="nowrap">28 July</span> 2022</span>.</cite><span title="ctx_ver=Z39.88-2004&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook&amp;rft.genre=unknown&amp;rft.btitle=RFC-9110%3A+HTTP+Semantics&amp;rft.pub=IETF&amp;rft_id=https%3A%2F%2Fwww.rfc-editor.org%2Frfc%2Frfc9110.html&amp;rfr_id=info%3Asid%2Fen.wikipedia.org%3AUser+agent" class="Z3988"></span></span></li>
                </ol>
            </small>
        </aside>
        <script>
            const input = document.getElementById('text-box');
            input.focus();
            input.select();
        </script>
        <article>
          <h2>Troubleshooting Browser Issues</h2>
          <p>If you're experiencing problems with your web browser, such as slow performance, frequent crashes, or error messages, there are a few steps you can take to troubleshoot the issue:</p>
          <dl>
            <dt>Clear your cache and cookies</dt>
            <dd>This can often solve problems related to slow performance or website loading issues.</dd>
            <dt>Update your browser</dt>
            <dd>Make sure you're using the latest version of your browser to ensure maximum compatibility and security.</dd>
            <dt>Disable extensions</dt>
            <dd>If you're using browser extensions or add-ons, try disabling them to see if they are causing the issue.</dd>
            <dt>Check your internet connection</dt>
            <dd>Sometimes slow or intermittent internet connectivity can cause problems with your browser.</dd>
            <dt>Try a different browser</dt>
            <dd>If all else fails, try using a different web browser to see if the issue persists.</dd>
          </dl>
          <p><strong>Note: WhatIsMyUserAgent.com provides <em>no</em> technical support. This text is intended for informational purposes only and should not be construed as professional advice.</strong></p>
        </article>
    
        <footer>
            <div class="footer">
                <p>Webmaster: <a href="https://copypaste.wtf">Fredrick R. Brennan</a> (</p>
                <div class="email-container">
                    <div class="email">
                        <span class="copy-paste">コピペ　＠<br>子猫ら　ピリオド　Ｐ　Ｈ</span><img class="sig" src="${email}"><span class="grow"></span>
                    </div>
                    <div class="art">
                        <p class="author">art by @maaudaan_tg</p>
                        <img src="${siggy}" alt="This pixel art was drawn by Fred Brennan and アノン狸 based on large format art drawn by @maaudaan_tg (Twitter username)." class="siggy">
                    </div>
                </div><p>).</p>
            </div>
            <p>This site is free software. You may obtain a copy from <a href="https://github.com/ctrlcctrlv/whatismyuseragent.com">Github: <tt>ctrlcctrlv/whatismyuseragent.com</tt></a>.</p>
            <hr/>
            <p><em><strong>Fursecutors beware!</strong> Complaints about the furry art on this site may be posted for public mockery.</em></p>
        </footer>
    </body>
</html>
`;
