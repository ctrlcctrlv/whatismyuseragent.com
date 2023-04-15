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
        <div style="display:flex;align-items:last baseline">
            <p>
                Webmaster: Fredrick R. Brennan<img src="data:image/webp;base64,UklGRkwBAABXRUJQVlA4TD8BAAAvH8AHEHegKJIUhyyBwgFPBCDh/KuIErChKJLk5Cj/vEkJGYh/DXHApDiSpOQU1xDsSRrkHw8v5j8AAACc/xWypcDmrZelpcM6pHnGe6ELC9dvgecDcGttW6TMnG1gvlXcqUBjq8AtcteUQw3uTETI2QiXdzpYKQF3eYv4BS8gov8M3LZtxO7d3v3C+ZMg1k4Wr8m1djI1NkW1+qaoVQ7tiQr+kGVoG0bw46YNWCHX0HsOBEAKyDcsA2kGKWYt+3gn+U4GNhbdkHKTtaRYGmZRWZjzruGxqKzsRvdPaR6eS5srb3T/gsH/xGVU2R1/thuXcT3iP1OEFKEJjySZJrmQaxgjsz0t4OV5nv4bwAVQV3UMIKSXnQL5wD72AWOjWSC5j/18QLWNeIF8kX10uNZ/FFVJzsXEsYMnKrjOvwwOAA==" alt="This pixel art was drawn by Fred Brennan based on large format art drawn by @PocketFurry (Twitter username)." style="image-rendering: crisp-edges;height:32px;width:32px"> (<img height="24.5" src="data:image/webp;base64,UklGRvoBAABXRUJQVlA4TO4BAAAv6AAMAA8w//M///MfeAk1bRswat7yR7wwRPR/AgRENz8kadue3MmT/DmnaYukuBOc4Zkxg5SLBbAEXQB0hBNcRi5DXYS7OwtwZ1hvypHar1e7gIiYgCEKlUyU3+AQnXif4DMA9aFfpLRDWdzBIZ3Gkd7gaYBzCdktSFKaTIYahT6lQA39AwZrE7xIB/oJhT/M7RXITs3y5Qkuwxo8CPfpU4LOoIg1JiFXRUobE+AbMBST+A2GAEf9Bpwe+udp1ICzhNBJbye+73Sd0+vqL903O9QxhBoEs/qjMb9O/wcGnWD1lfrlA2xq/BYggacWtBVAj20ANCCA44DgIZJaTZ4QmocYUG2Br7C3nSHwDS0DY7/BNwMwJOhUYL0gHN2tkRKFwlIDgo8qtuXhQ+MeedZO3dEoMXQIGTZRfgzU0AgLDRQwWAIDD4FmQC1CBBTaWtcJ4EXHEoTCMnY7KGLFN2qdl8ooNGMttW4ORidKpxZjvHyIEEALXsuFG5sBoe6W1ndO50Yw1u+LaC/ht93cMOQvY5izWbzdvKSiDn+fGUU0sel0YJK94qJDcynT+TAKD9u+RYsON01ZxF4PsJNKJ2KxmgR4wSRJjobkMsWKggr2ogiHkyIPHTfebSEWvMhDxQGCcewLsWw6mIuKA8fEDA=="/>)
            </p>
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
