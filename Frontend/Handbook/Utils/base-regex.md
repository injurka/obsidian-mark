**1. Validating Email Addresses:**  

```ts
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
```

**2. Validating URLs:**  

```ts
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
```

**3. Validating Dates in YYYY-MM-DD Format:**  

```ts
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
```

**4. Validating Phone Numbers (US Format):**  

```ts
const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
```

**5. Validating Postal Codes (US Format):**  

```ts
const postalCodeRegex = /^\d{5}(?:-\d{4})?$/;
```

**6. Validating Credit Card Numbers (Luhn Algorithm):**  

```ts
const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
```

**7. Validating Social Security Numbers (SSN):**  

```ts
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
```

**8. Validating IP Addresses (IPv4):**  

```ts
const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
```

**9. Validating Hexadecimal Color Codes:**  

```ts
const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
```

**10. Extracting All URLs from a String:**  

```ts
const extractURLs = /https?:\/\/\S+/g;
```

**11. Extracting All Email Addresses from a String:**  

```ts
const extractEmails = /[\w.-]+@[a-zA-Z-]+\.[a-zA-Z]{2,3}/g;
```

**12. Matching HTML Tags:**  

```ts
const htmlTagsRegex = /<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gi;
```

**13. Matching HTML Comments:**  

```ts
const htmlCommentsRegex = /<!--[\s\S]*?-->/g;
```

**14. Matching CSS Classes:**  

```ts
const cssClassRegex = /\.([a-zA-Z_-][\w-]*)/g;
```

**15. Matching Twitter Handles:**  

```ts
const twitterHandleRegex = /@[a-zA-Z0-9_]+/g;
```

**16. Matching Hashtags:**  

```ts
const hashtagRegex = /#[a-zA-Z0-9_]+/g;
```

**17. Matching Mentions in Tweets:**  

```ts
const mentionRegex = /@([a-zA-Z0-9_]+)/g;
```

**18. Matching YouTube Video IDs in URLs:**  

```ts
const youtubeVideoIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
```

**19. Matching Twitter URLs:**  

```ts
const twitterUrlRegex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+/;
```

**20. Matching YouTube URLs:**  

```ts
const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
```

**21. Matching Instagram Usernames:**  

```ts
const instagramUsernameRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9_]+/;
```

**22. Matching Instagram URLs:**  

```ts
const instagramUrlRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(p|tv|reel)\/[a-zA-Z0-9_]+/;
```

**23. Matching YouTube Playlist URLs:**  

```ts
const youtubePlaylistRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/;
```

**24. Matching Google Drive URLs:**  

```ts
const googleDriveUrlRegex = /(?:https?:\/\/)?drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
```

**25. Matching SoundCloud URLs:**  

```ts
const soundcloudUrlRegex = /(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;
```

**26. Matching GitHub Repository URLs:**  

```ts
const githubRepoUrlRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+/;
```

**27. Matching GitHub Gist URLs:**  

```ts
const githubGistUrlRegex = /(?:https?:\/\/)?(?:www\.)?gist\.github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9]+/;
```

**28. Matching Medium URLs:**  

```ts
const mediumUrlRegex = /(?:https?:\/\/)?(?:www\.)?medium\.com\/(@[a-zA-Z0-9_-]+)\/[a-zA-Z0-9_-]+/;
```

**29. Matching Stack Overflow URLs:**  

```ts
const stackoverflowUrlRegex = /(?:https?:\/\/)?(?:www\.)?stackoverflow\.com\/questions\/([0-9]+)/;
```

**30. Matching LinkedIn Profile URLs:**  

```ts
const linkedinProfileUrlRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/;
```

**31. Matching IPv6 Addresses:**  

```ts
const ipv6Regex = /(?:(?:(?:[0-9a-fA-F]{1,4}:){6}|(?=(?:[0-9a-fA-F]{0,4}:){2,6}(?:[0-9.]{1,3})){((?=.*(::))(?=(.*?::))(::)?(([0-9a-fA-F]{1,4}:){0,5}|:)((?::[0-9a-fA-F]{1,4}){1,2}:|(?:[0-9]{1,3}\.){3}[0-9]{1,3})))(%.+)?\b/;
```

**32. Matching Base64 Encoded Strings:**  

```ts
const base64Regex = /^[a-zA-Z0-9-_]+={0,2}$/;
```

**33. Matching Markdown Headings:**  

```ts
const markdownHeadingRegex = /^(#{1,6})\s(.+)/;
```

**34. Matching Markdown Links:**  

```ts
const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
```

**35. Matching HTML Entities:**  

```ts
const htmlEntityRegex = /&(?:[a-zA-Z]+|#\d+);/;
```

**36. Matching XML Tags:**  

```ts
const xmlTagRegex = /<([a-zA-Z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/gi;
```

**37. Matching Docker Image Tags:**  

```ts
const dockerTagRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/;
```

**38. Matching Semantic Versioning (SemVer):**  

```ts
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)?(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
```

**39. Matching YAML Front Matter:**  

```ts
const yamlFrontMatterRegex = /---\n([\s\S]*?)\n---/;
```

**40. Matching JSON Objects:**  

```ts
const jsonObjectRegex = /{[\s\S]*?}/;
```

**41. Matching JSON Arrays:**  

```ts
const jsonArrayRegex = /\[[\s\S]*?\]/;
```

**42. Matching CSS Color Codes:**  

```ts
const cssColorRegex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/;
```

**43. Matching HTML Hexadecimal Entities:**  

```ts
const htmlHexEntityRegex = /&#x[0-9A-Fa-f]+;/;
```

**44. Matching HTML Decimal Entities:**  

```ts
const htmlDecimalEntityRegex = /&#\d+;/;
```

**45. Matching Base64 Data URLs:**  

```ts
const base64DataUrlRegex = /^data:([a-z]+)\/([a-z]+);base64,([^\s]+)/;
```

**46. Matching UUID (Universally Unique Identifier):**  

```ts
const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
```

**47. Matching ISBN (International Standard Book Number):**  

```ts
const isbnRegex = /^(?:ISBN(?:-10)?:? ?)?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?(?:[0-9]+[- ]?){2}[0-9X]$/;
```

**48. Matching XML or HTML Comments:**  

```ts
const xmlHtmlCommentRegex = /<!--[\s\S]*?-->/;
```

**49. Matching Google Analytics Tracking IDs:**  

```ts
const googleAnalyticsIdRegex = /^(UA|YT|MO)-\d{4,}-\d{1,2}$/;
```

**50. Matching ISBN (International Standard Book Number) with Hyphens:**  

```ts
const isbnWithHyphensRegex = /^(?=(?:[0-9]+[- ]){3})[- 0-9]{13}$/;
```
