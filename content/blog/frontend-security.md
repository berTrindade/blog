---
title: "Secure Frontend Development"
date: "2024-12-13"
category: Engineering
excerpt: "Protect your apps from common vulnerabilities."
image: https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop
---

Frontend is not secure by default. Everything that runs on the client can be inspected, modified, and used against you.<Footnote id="fn-1">JavaScript code in the browser can be inspected through DevTools, modified at runtime, and even decompiled. Therefore, never trust validations or critical logic executed only on the frontend.</Footnote> This interactive guide shows the main security concerns in frontend development.

## XSS: Cross-Site Scripting

The most common attack on web applications. It happens when you render user content without sanitization.

Try inserting `<img src=x onerror="alert('XSS')" />` in the fields below and see the difference between vulnerable and secure code:

<XSSDemoSandpack />

## How to prevent XSS

1. Never use `dangerouslySetInnerHTML` without sanitization
2. Use `textContent` instead of `innerHTML`
3. Sanitize HTML with DOMPurify when necessary<Footnote id="fn-2">[DOMPurify](https://github.com/cure53/DOMPurify) is the most used library for HTML sanitization. It removes malicious scripts while maintaining safe content formatting.</Footnote>
4. Configure Content Security Policy (CSP)<Footnote id="fn-3">Content Security Policy is an HTTP header that defines which resources can be loaded. See the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) for complete implementation.</Footnote>

## Tokens and Storage

Where to store authentication tokens? localStorage, sessionStorage, or cookies?

Interact with the examples below and see why HttpOnly Cookies are more secure:

<TokenStorageDemoSandpack />

## Authentication and Authorization

The frontend doesn't control anything. Never trust client-side validations.

<AuthDemo />

## Golden Rules

1. Frontend hides, Backend blocks
2. Always validate on the server
3. Use RBAC (Role-Based Access Control)
4. Implement rate limiting

## Secrets in the Frontend

There are no secrets in the bundle. Anything that goes to the browser can be seen.

<SecretsDemo />

## Dependencies and Supply Chain

When you install a library, you install the code + the bugs + the author's intentions.

<DependenciesDemo />

## OWASP Top 10 Frontend

Use OWASP as a checklist for conversation with the backend.<Footnote id="fn-4">The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is regularly updated and serves as a reference for the most critical vulnerabilities in web applications.</Footnote>

<OWASPDemo />

## Conclusion

Security is a shared responsibility:

- Frontend: Validates UX, sanitizes inputs, uses HTTPS
- Backend: Validates security, authenticates, authorizes
- DevOps: WAF, rate limiting, monitoring

## Quick Wins - Implement Today

1. Add CSP headers
2. Use HttpOnly cookies for tokens
3. Sanitize user input with DOMPurify
4. Run `npm audit` regularly
5. Implement HTTPS everywhere

Remember: Zero Trust — Never trust, always validate.

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Regularly updated list of critical vulnerabilities
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify) - HTML sanitization library
- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) - Complete Content Security Policy guide
- [npm audit](https://docs.npmjs.com/cli/v10/commands/npm-audit) - Official npm audit documentation
- [Web Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html) - OWASP Node.js security cheat sheet

