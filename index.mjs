import { HTML } from "./html.mjs";
import { get_file_contents } from "./util.mjs";

const HTMLbody = (ua, extra = {}) => HTML(ua, extra = extra);

const HTMLheaders = { "content-type": "text/html; charset=utf-8" };
const XMLheaders = { "content-type": "text/xml; charset=utf-8" };
const JSONheaders = { "content-type": "application/json; charset=utf-8" };
const JSheaders = { "content-type": "application/javascript; charset=utf-8" };
const TEXTheaders = { "content-type": "text/plain; charset=utf-8" };

const headers = (accept) => {
    const type = accept.split(";")[0].trim();
    if (type === "text/html" || type === "*/*") {
        return HTMLheaders;
    } else if (type === "application/json") {
        return JSONheaders;
    } else {
        return TEXTheaders;
    }
}

const body = (ua, accept, headers = {}) => {
    const type = accept.split(";")[0].trim();
    delete headers["domainName"];
    delete headers["domainPrefix"];
    delete headers["apiId"];

    if (type === "text/html" || type === "*/*") {
        return HTMLbody(ua, headers);
    } else if (type === "application/json" || type === "text/json") {
        return JSON.stringify({ "User-Agent": ua });
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

const userAgent = (ua) => {
    if (ua === "Amazon CloudFront") return "";
    else return ua;
}

const default_handler = async (event) => {
    const eheaders = event["headers"];
    let accept, ua;
    
    if (event.rawQueryString.match("debug")) {
        return {
            statusCode: 200,
            body: JSON.stringify(event)
        }
    }

    if (eheaders && eheaders["accept"]) {
        accept = eheaders["accept"].split(",")[0];
    } else {
        accept = "text/plain; charset=utf-8";
    }

    if (eheaders && eheaders["user-agent"]) {
        ua = userAgent(eheaders["user-agent"]);
    } else {
        ua = "";
    }

    if (eheaders && eheaders["x-forwarded-for"] &&
        event.requestContext &&
        event.requestContext["http"] &&
        event.requestContext["http"]["sourceIp"])
        event.requestContext["http"]["sourceIp"] = eheaders["x-forwarded-for"];

    const response = {
        statusCode: statusCode(ua),
        headers: headers(accept),
        body: body(ua, accept, event.headers) //+ JSON.stringify(event),
    };

    return response;
};

export const handler = async(event) => {
    let headers, statusCode, body;
    switch (event.rawPath) {
        case "/robots.txt":
            headers = TEXTheaders;
            statusCode = 200;
            body = get_file_contents(event, "./resources/robots.txt");
            break;
        case "/sitemap.xml":
            headers = XMLheaders;
            statusCode = 200;
            body = get_file_contents(event, "./resources/sitemap.xml");
            break;
        case "/mobiletablefix.js":
            headers = JSheaders;
            statusCode = 200;
            body = get_file_contents(event, "./resources/mobiletablefix.js");
            break;
        /*case "/debug":
            headers = JSONheaders;
            statusCode = 200;
            body = JSON.stringify(event);
            break;*/
        default:
            return default_handler(event);
    }
    return { headers: headers, statusCode: statusCode, body: body };
};