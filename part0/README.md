# 0.4: New note

```mermaid
sequenceDiagram
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server->>browser: URL redirect
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: HTML-code
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: main.css
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server->>browser: main.js
    Note left of browser: browser starts executing JS code that requests JSON from server
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: data.json
    Note left of browser: browser executes the event handler that renders notes to the page
```

# 0.5: Single page app

```mermaid
sequenceDiagram
    browser->>server: HTTP GET  https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML-code
    browser->>server: ttps://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: main.css
    browser->>server: https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: spa.js
    Note left of browser: browser executes JS code that requests JSON from server
    browser->>server: HTTP GET ttps://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: data.json
    Note left of browser: browser executes the event handler that renders notes to the page
```
