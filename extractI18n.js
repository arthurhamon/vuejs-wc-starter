/* eslint-disable */
const fs = require('fs');
const pjson = require('./package.json');

function main() {
  // Get the source translation file
  // this is the one we send to phrase app
  const sourceFile = require(pjson.config.i18nPath + pjson.config.i18nSourceFile);

  // Get the file with all the missing translations
  const missingTranslationFile = require(pjson.config.i18nPath + pjson.config.i18nMissingTranslationFile);

  // Create an empty Map to save the missing key, only one is required
  const missingKeysMap = new Map;

  // Loop on the missingKeys
  // Add each missing key to a map
  missingTranslationFile.missingKeys.forEach(missingKey => {
    missingKeysMap.set(missingKey.path, '');
  });

  const missingKeysJson = {};
  // Then loop over the map to recreate the missing JSON object
  missingKeysMap.forEach((value, key) => {
    const nameParts = key.split('.');
    const entry = nameParts[0];

    if (entry !== pjson.config.i18nProjectName) {
      // We only deal with the translation that starts with pjson.config.i18nProjectName
      // Otherwise return;
      return;
    }

    let objectReference;
    // Loop over the path EX: prop.prop.prop
    nameParts.forEach((propName, index) => {
      if (index === 0) {
        if (!missingKeysJson.hasOwnProperty(propName)) {
          console.info(`Extract i18n : First entry ${propName} created.`);
          missingKeysJson[propName] = {};
        }
        objectReference = missingKeysJson[propName];
      } else if (index !== nameParts.length - 1) {
        // We create more deep structural JSON object
        if (!objectReference.hasOwnProperty(propName)) {
          console.info(`Extract i18n : Inner property ${propName} created.`);
          objectReference[propName] = {};
        }
        objectReference = objectReference[propName];
      } else {
        objectReference[propName] = value;
      }
    });

    return;
  });

  // Merge the object missingKeysJson and the one from the source file.
  sourceFile[pjson.config.i18nProjectName] = {
    ...missingKeysJson[pjson.config.i18nProjectName],
    ...sourceFile[pjson.config.i18nProjectName],
  };

  // Then check the unusedKeys and remove them

  // Create an empty Map to save the missing key, only one is required
  const unusedKeysMap = new Map;
  // Add each missing key to a map
  missingTranslationFile.unusedKeys.forEach(unusedKey => {
    unusedKeysMap.set(unusedKey.path);
  });

  // Then loop over the map to delete the unused property
  unusedKeysMap.forEach((_, key) => {
    pruneTree(sourceFile, key, true);
  });

  // Delete missing.json at the end
  fs.unlink(pjson.config.i18nPath + pjson.config.i18nMissingTranslationFile, function(err) {
    if (err) throw err;
    console.log(`The file ${pjson.config.i18nPath}${pjson.config.i18nMissingTranslationFile} has been deleted!`);
  });

  // To finish, saved the new sourceFile in the current source.json file.
  fs.writeFile(pjson.config.i18nPath + pjson.config.i18nSourceFile, JSON.stringify(sourceFile), function (err) {
    if (err) throw err;
    console.info(`The file ${pjson.config.i18nPath}${pjson.config.i18nSourceFile} has been updated!`);
    console.info(`Now push this translation to Phrase app`);
  });
}

// A function to delete a prop in an object and recursively call himself to
// check if the parent is empty, if yes delete it and do the recursive again
function pruneTree(obj, path, first) {
  if (!obj || !path || path.length === 0) {
    return;
  }

  if (typeof path === 'string') {
    path = path.split('.');
  }

  let current = obj;
  for (var i = 0; i < path.length - 1; i++) {
    current = current[path[i]];

    if (typeof current === 'undefined') {
      return;
    }
  }

  if (first) {
    delete current[path.pop()];
    pruneTree(obj, path, false);
    return;
  }

  if (Object.keys(current[path[path.length - 1]]).length === 0) {
    delete current[path.pop()];
    pruneTree(obj, path, first);
    return;
  }
}

main();
