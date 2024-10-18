---
sidebar_position: 1
slug: /
---

# Overview

The purpose of configuration-files can be abstractly summarized as follows: to express renderable patterns, be it messages, items, UIs, actions, and the like. Rendering then refers to the process of evaluating a template, as configured, within an environment, which supplies the necessary data. To ensure not only ease of use, but also proper validation, sane defaults as well as type-safety, mapping configuration-sections to Java-objects comes as a natural solution.

Separating the logic of features from their appearances is the main motivation behind introducing complex expressions. The user should not need to recompile or even restart their server in order to adjust the appearance of any given feature to their exact liking. Simultaneously, it is unreasonable to assume basic scripting-experience of not only the average user, but also translators, which is why all text needs to be extracted onto a meta-level, to be then inlined into the default configuration by the pre-processor. Thereby, those who wish to tinker and get into the depths of what's possible can unobstructedly do so, while everybody else simply edits plain text files. Having this additional layer in place also allows for a central point of specifying expressions, without the need to duplicate them for each new supported language.

The configuration-file expresses rendering behavior on the basis of content-variables; a whole host of text-files, containing translations, can then be selected as a source for pre-processing; the process of pre-processing not only substitutes actual content on startup, but also outputs a resulting file, to be used as a template for manual expression tinkering.