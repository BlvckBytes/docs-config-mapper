"use strict";(self.webpackChunkdocs_config_mapper=self.webpackChunkdocs_config_mapper||[]).push([[561],{8297:e=>{e.exports=JSON.parse('{"version":{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"documentationSidebar":[{"type":"link","label":"Overview","href":"/docs-config-mapper/","docId":"overview","unlisted":false},{"type":"link","label":"Pre-Processor","href":"/docs-config-mapper/pre-processor","docId":"pre-processor","unlisted":false},{"type":"link","label":"Configuration File","href":"/docs-config-mapper/configuration-file","docId":"configuration-file","unlisted":false},{"type":"link","label":"Add A Translation","href":"/docs-config-mapper/add-a-translation","docId":"add-a-translation","unlisted":false}]},"docs":{"add-a-translation":{"id":"add-a-translation","title":"Add A Translation","description":"In order to introduce a new supported translation, first start by creating a copy of the actively maintained language, namely en_us.txt, and rename it to suit what you\'re about to introduce. All implementations should support a means of live-reloading the configuration, allowing you to preview your progress in-game; make sure that the newly created file is selected as a pre-processor input in the corresponding YAML configuration-file.","sidebar":"documentationSidebar"},"configuration-file":{"id":"configuration-file","title":"Configuration File","description":"All keys and expressions within YAML configuration-files are written in English, since this language represents a widely accepted common-ground.","sidebar":"documentationSidebar"},"overview":{"id":"overview","title":"Overview","description":"The purpose of configuration-files can be abstractly summarized as follows: to express renderable patterns, be it messages, items, UIs, actions, and the like. Rendering then refers to the process of evaluating a template, as configured, within an environment, which supplies the necessary data. To ensure not only ease of use, but also proper validation, sane defaults as well as type-safety, mapping configuration-sections to Java-objects comes as a natural solution.","sidebar":"documentationSidebar"},"pre-processor":{"id":"pre-processor","title":"Pre-Processor","description":"The pre-processor resembles very simple key/value-based substitution, used to extract localized textual content from the configuration-file, which expresses rendering behavior.","sidebar":"documentationSidebar"}}}}')}}]);