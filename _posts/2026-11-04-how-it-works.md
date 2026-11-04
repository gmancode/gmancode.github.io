---
layout: post
lang: en
ref: how-it-works
permalink: /blog/how-airhome-works/
title: "How airhome works under the hood"
date: 2026-11-04 11:00:00 +0000
tags: [rust, audio]
summary: "From the sound Windows plays to the HomePod: capture, encoding, encryption and timing."
---

A short tour of what happens between the moment Windows plays a sound and the moment the HomePod plays it.

## Capturing the sound

airhome records what Windows sends to the default output device (the WASAPI "loopback" mode), so any program's sound is captured without a virtual sound card. When nothing is playing, Windows delivers no data at all, so airhome fills the gaps with silence. Otherwise the stream would stall and the speaker would stop.

## Encoding and sending

The audio is cut into fixed blocks, compressed with ALAC (lossless), encrypted and sent to the speaker over RTP, while RTSP carries the control messages. Pairing uses HomeKit's "transient" mode, so no Apple account is needed.

## Playing in sync

Every packet carries a timestamp from a shared PTP clock. With one speaker, the speaker provides the clock. With several, they all follow the same clock, which is what keeps them in sync.

## Only one speaker playing

Streaming alone would make the sound come out of both the HomePod and the PC. So airhome mutes the PC's default output for the duration of the stream and writes the previous state to a small file first. If the program is killed, the next start reads that file and puts the sound back.

## Small details that matter

Windows timers tick every 15.6 ms by default, which is too coarse for 8 ms packet pacing, so airhome asks for 1 ms. The audio threads also run with a raised priority so the sound stays smooth when the PC is busy.
