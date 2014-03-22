---
layout: post
title: InDesign document recovery
date: '2011-12-20T14:05:05+01:00'
tags:
- ID
- InDesign
tumblr_url: http://fabiantheblind.tumblr.com/post/14507747471/indesign-document-recovery
---
InDesign document recoveryThe InDesign Recovery folder

This section describes the contents and locations of the InDesign Recovery folder.

Folder contents

dbt [random alphanumeric character]: A temporary file with mini-saved information for every open InDesign document. The names of these temporary files always begin with “dbt” and, on Windows, end with “tmp.”
 Default settings: A temporary file that stores default settings. It is the first temp file listed when you view the contents of the InDesign Recovery folder by name.
RecoveryData: An index for all open InDesign documents and crashed documents, including their complete path names. The list of open documents contains paths not aliases, which means InDesign is not able to recover files you move or rename after a crash.
Note: If you take the document in need of recovery to another system and open it there, InDesign will be unable to search the RecoveryData file and you will lose the opportunity to recover data that may be been stored before the crash. Therefore, it is recommended you recover documents immediately after a crash by starting InDesign and saving any recovered documents.
ProtectiveShutdownLog: A log file generated if InDesign crashes due to an access violation. You can open this file in a text editor (for example, Wordpad) to view the time, date, error, and plug-ins that were loaded in InDesign when the crash occurred. This log file is helpful for identifying a specific plug-in that may have caused the error.
Folder locations

Each user account has a separate InDesign Recovery folder. If InDesign cannot locate the InDesign Recovery folder during startup, it re-creates the folder.

Mac OS X: Users/[User Name]/ Library/Cache/Adobe InDesign/Version[#.0]/ InDesign Recovery
Windows XP: C:\Documents and Settings[User Name]\Local Settings\Application Data\Adobe/InDesign\Version [#].0\en_US\Caches\InDesign Recovery
Windows Vista and 7:C:\Users/[User Name]\AppData\Local\Adobe\InDesign\Version [#].0\en_US\Caches\InDesign Recovery
