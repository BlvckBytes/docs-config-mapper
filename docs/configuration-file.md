---
sidebar_position: 3
---

# Configuration File

All keys and expressions within `YAML` configuration-files are written in English, since this language represents a widely accepted common-ground.

## Pre-Processor Input

The instruction containing information about which input-file to apply when pre-processing has to occur within the header-comment of the configuration; the header-comment consists of any number of consequtive commented lines. The notation is as simple as the input-file itself, being simply `PRE-PROCESSOR-INPUT <file-name>`; localization-files are kept in the same directory as the config itself.

```yaml
# PRE-PROCESSOR-INPUT zh_cn.txt

config:
  starts: here
```

## Expressions

Expressions are parsed using [GPEEE](https://github.com/BlvckBytes/GPEEE), while keys are mapped to Java-objects using [BBConfigMapper](https://github.com/BlvckBytes/BBConfigMapper); to provide additional plugin-specific features, [BukkitEvaluable](https://github.com/BlvckBytes/BukkitEvaluable) wraps the mapper. While there is still a lot of room for improvement, basic feature-documentation can be found at the README of these linked-to repositories.