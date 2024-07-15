```js
{ pkgs, ... }:

{
  environment.systemPackages = with pkgs; [
    (openssl.overrideAttrs (oldAttrs: {
      version = "3.0.9";
      src = fetchurl {
        url = "https://www.openssl.org/source/openssl-3.0.9.tar.gz";
        sha256 = "146wl401pgxb7ih5mmk3iv1sn0ssijfvi2iigkvn0hs7h53v06pb";
      };
    }))
  ];
}
```