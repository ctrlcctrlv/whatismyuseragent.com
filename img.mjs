const WEBP_HEADER = "data:image/webp;base64,";

const IMG = "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\
GmI0CpwePt4K8sNvDe+3JfIB";

const EMAIL = "UklGRvoBAABXRUJQVlA4TO4BAAAv6AAMAA8w//M///MfeAk1bRswat7yR7wwRPR/AgRENz8kadue3MmT/DmnaYukuBOc4Zkxg5SLBbAEXQB0hBNcRi5DXYS7OwtwZ1hvypHar1e7gIiYgCEKlUyU3+AQnXif4DMA9aFfpLRDWdzBIZ3Gkd7gaYBzCdktSFKaTIYahT6lQA39AwZrE7xIB/oJhT/M7RXITs3y5Qkuwxo8CPfpU4LOoIg1JiFXRUobE+AbMBST+A2GAEf9Bpwe+udp1ICzhNBJbye+73Sd0+vqL903O9QxhBoEs/qjMb9O/wcGnWD1lfrlA2xq/BYggacWtBVAj20ANCCA44DgIZJaTZ4QmocYUG2Br7C3nSHwDS0DY7/BNwMwJOhUYL0gHN2tkRKFwlIDgo8qtuXhQ+MeedZO3dEoMXQIGTZRfgzU0AgLDRQwWAIDD4FmQC1CBBTaWtcJ4EXHEoTCMnY7KGLFN2qdl8ooNGMttW4ORidKpxZjvHyIEEALXsuFG5sBoe6W1ndO50Yw1u+LaC/ht93cMOQvY5izWbzdvKSiDn+fGUU0sel0YJK94qJDcynT+TAKD9u+RYsON01ZxF4PsJNKJ2KxmgR4wSRJjobkMsWKggr2ogiHkyIPHTfebSEWvMhDxQGCcewLsWw6mIuKA8fEDA==";

export const siggy = WEBP_HEADER+IMG;
export const email = WEBP_HEADER+EMAIL;