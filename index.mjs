import {siggy, email} from "./img.mjs";

const HTML = (ua, extra={}) => {
    return `
<!doctype html>
<html lang=en>
    <head>
        <title>What is my user agent?</title>
    </head>
    <body>
        <h1>Your user agent is…</h1>
        <div>
            <textarea id="text-box" rows="4" cols="50">${ua}</textarea>
        </div>
        <div style="margin-top:10em"></div>
        <hr/>
    </body>
    <script>
        const input = document.getElementById('text-box');
        input.focus();
        input.select();
    </script>
    <pre>${extra}
    </pre>
    <footer>
        <div style="display:flex;align-items:center">
            Webmaster: Fredrick R. Brennan (<img src="${email}"/><img src="${siggy}" alt="This pixel art was drawn by Fred Brennan and アノン狸 based on large format art drawn by @maaudaan_tg (Twitter username)." style="image-rendering: crisp-edges;margin-bottom: 200px">)
        </div>
        <p>This site is free software. You may obtain a copy from <a href="https://github.com/ctrlcctrlv/whatismyuseragent.com">Github: <tt>ctrlcctrlv/whatismyuseragent.com</tt></a>.</p>
    </footer>
</html>
` ;
}

const HTMLbody = (ua, extra={}) => {
    return HTML(ua, extra=extra);
}

const HTMLheaders = {"content-type": "text/html; charset=utf-8"};
const JSONheaders = {"content-type": "application/json; charset=utf-8"};
const TEXTheaders = {"content-type": "text/plain; charset=utf-8"};

const headers = (accept) => {
    const type = accept.split(";")[0].trim();
    if (type === "text/html") {
        return HTMLheaders;
    } else if (type === "application/json") {
        return JSONheaders;
    } else {
        return TEXTheaders;
    }
}

const body = (ua, accept, headers={}) => {
    const type = accept.split(";")[0].trim();
    delete headers["domainName"];
    delete headers["domainPrefix"];
    delete headers["apiId"];
    if (type === "text/html") {
        return HTMLbody(ua, JSON.stringify(headers, null, "\t"));
    } else if (type === "application/json" || type === "text/json") {
        return JSON.stringify({"User-Agent": ua});
    } else {
        return ua;
    }
}

const statusCode = (ua) => {
    if (ua === "") {
        return 510;
    } else {
        return 200;
    }
}

export const handler = async(event) => {
    const eheaders = event["headers"];
    let accept, ua;
    if (eheaders && eheaders["accept"]) {
        accept = eheaders["accept"].split(",")[0];
    } else {
        accept = "text/plain; charset=utf-8";
    }
    if (eheaders && eheaders["user-agent"]) {
        ua = eheaders["user-agent"];
    } else {
        ua = "";
    }
    
    const response = {
        statusCode: statusCode(ua),
        headers: headers(accept),
        body: body(ua, accept, event.requestContext),
    };
    return response;
};
