---
sidebar_position: 2
---

# Pre-Processor

The pre-processor resembles very simple key/value-based substitution, used to extract localized textual content from the configuration-file, which expresses rendering behavior.

## Keys And Values

In order to avoid needless complexity and improve on readability, input-files do not contain any control-characters whatsoever, besides comment-markers (`#`).

The key is simply identified as the first word of the line, which thereby cannot contain spaces; keys can only consist of uppercase latin characters and digits, as well as hyphens (`-`). Do not refrain from employing long and verbose keys, and scope groups of keys by a common prefix, as to visually depict their mutual belonging.

After this key, any amount of white-space may follow; it is advised to align values so their beginning shares a common column, making it a lot easier to read and edit. If the first character of the value is required to be a space, prepend it by a backslash (`\`); if a value is required to have trailing spaces, append them by a backslash also; to have a literal backslash at either the beginning or the end of a line in combination with whitespace, prepend the backslash by another backslash, e.g. `\\`. Backslashes at the beginning of a line which are not followed up by whitespace do not require escaping; similarly, backslashes at the end of a line which are not prepended by whitespace do not require escaping either.

```txt
A-RATHER-LONG-KEY The value of the first key, without any spaces
SHORT-KEY         \ The value of the second key, containing one leading and two trailing spaces  \
THIRD-KEY         \\ The value of the third key, starting and ending with literal backslashes, which are padded out by a space each \\
LAST-KEY          \The value of the last key, starting and ending with literal backslashes without spacing, thereby not requiring any escaping\
```

## Variables

Always remember that the only objective of this file is to extract localized text, **not** to define appearance and behavior; thus follows, that variables are simple values on which *no further operations* will be carried out. The names of said variables adhere to the same constraints as pre-processor keys do, with the only difference of being all lower-case, as to not confuse them with the former; there is **no** recursive key-substitution, by design! To request substitution, enclose variable-names in curly-brackets (`{...}`), without any additional inside whitespace.

For the pre-processor value to contain a literal `{...}`, escape **only** the opening-bracket, e.g. `\{literal-curlies}`.

The developer(s) of the software should always document existing variables for each key in a comment right above, as to help translators understand the underlying evaluation-environment. This notation is standardized, and has the format of `# - <name>: <type>`; by adhering to this layout, automatic migration of existing local files will also update informational variable comments.

:::warning
Only consecutive comments above a key are associated with said key, thereby making it mandatory to not space variable documentations out by blank lines.
:::

```txt
# - owner: String
# - loc_x: Integer
# - loc_y: Integer
# - loc_z: Integer
MESSAGE-BEFORE-TELEPORTING &7Teleporting to the Shop of &e{owner} &7at &e{loc_x}&7, &e{loc_y}&7, &e{loc_z}&7.
```

## Substitution

YAML-keys whose values contain pre-processor variables will always be turned into expression-mode by appending a trailing dollar (`$`) to their name, if not yet present, since strings are substituted as their corresponding literals, and possibly present variables need to access the evaluation-environment.

:::warning
While it is in general not advised to leave enabling expression-mode to the pre-processor and should thereby always be carried out manually, this feature can become especially dangerous on non-scalar values, namely lists; a list containing strings which are not wrapped in double-quotes (`"`) will be interpreted as variables, functions and key-words when enabling expression-mode, and are thus resulting in undesired and unexpected behavior.
:::

To request substitution, simply wrap the pre-processor key in curly-brackets (`{...}`) and prepend an at-symbol (`@`); at has been chosen instead of dollar, as to avoid conflicts with other widely-used substitution systems, as offered by - for example - Maven.

Interpolation will simply be translated to use of the concatenation-operator, as the following example portrays.

Input
```txt
LORE-LINE   &8♦ &7Location: &e{loc_x}&7, &e{loc_y}&7, &e{loc_z}
LORE-SPACER &8&m                                \
```

Config
```yml
myItem:
  lore$:
  - '@{LORE-SPACER}'
  - '@{LORE-LINE}'
  - '@{LORE-SPACER}'
```

Result
```yml
myItem:
  lore$:
  - '"&8&m                                "'
  - '"&8♦ &7Location: &e" & loc_x & "&7, &e" & loc_y & "&7, &e" & loc_z'
  - '"&8&m                                "'
```

### Temporary Variables

A great example of where temporary variables make a lot of sense is data-deduplication. The pre-processor only serves as a means to localize without the need to have any scripting experience, and it thereby should not be used to circumvent the versatility of expressions; the file-global lookup table can and should be used to deduplicate reoccurring values, like a chat-message prefix.

Once attached to a pre-processor key by the parentheses-syntax, the temporary variables specified therein are only available to the corresponding value:

```txt
<PRE-PROCESSOR-KEY>(<variable_1>=<value_1>;<variable_2>=<value_2>;...)
```

To avoid translators having to understand subscripting operators, the corresponding expression can be hidden behind a user-friendly variable-name, as presented below.

Input
```txt
MESSAGE-PREFIX      &8[&6YourPlugin&8]
CHAT-MESSAGE-FIRST  {prefix} &7This is the first message
CHAT-MESSAGE-SECOND {prefix} &7This is the second message
CHAT-MESSAGE-THIRD  {prefix} &7This is the third message
```

Config
```yml
chatMessages:
  first$: '@{CHAT-MESSAGE-FIRST(prefix=lut["MESSAGE_PREFIX"])}'
  second$: '@{CHAT-MESSAGE-SECOND(prefix=lut["MESSAGE_PREFIX"])}'
  third$: '@{CHAT-MESSAGE-THIRD(prefix=lut["MESSAGE_PREFIX"])}'

lut:
  MESSAGE_PREFIX$: '@{MESSAGE-PREFIX}'
```


Result
```yml
chatMessages:
  first$: 'lut["MESSAGE_PREFIX"] & " &7This is the first message"'
  second$: 'lut["MESSAGE_PREFIX"] & " &7This is the second message"'
  third$: 'lut["MESSAGE_PREFIX"] & " &7This is the third message"'

lut:
  MESSAGE_PREFIX$: '"&8[&6YourPlugin&8]"'
```

## Migrating Local Files

Existing translation-files are, if not yet existing locally, copied from the JARs resources into the plugin-folder, for quick and easy access, as well as personalization. If a file already exists, it is not overwritten, but rather migrated to the updated version.

### Discontinued Keys

If a key has been discontinued and is no longer made use of by the standard configuration as provided by the plugin, its local copy will simply be ignored and remain untouched, since the user may be storing relevant information therein.

### Absent Keys

If a key has been added in a new revision of the plugin, but is still missing locally, it will be inserted closest to an existing reference-key, which either be a predecessor, or a successor. If there's no locatable reference, it will simply be added to the very bottom. With the key, all comments above it will also be copied over, as to ensure envionment variable documentation.

### Existing Keys

If a key is already existing locally, its value will of course not be overwritten; comments above it will be scanned for environment variable documentation, and - if entries are missing - they will be added to the very bottom of this section, as to inform the user about new additions; discontinued variables *will be deleted*, as to avoid confusion.