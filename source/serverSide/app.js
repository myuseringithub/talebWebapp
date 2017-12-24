process.env.SZN_DEBUG = true // show/hide console messages.

import path from 'path'
import { default as Application } from 'appscript'
import configuration from '../../setup/configuration/configuration.json' 

import initializeDatabaseData from 'appscript/utilityFunction/database/initializeDatabaseData.js'
Application.eventEmitter.on('initializationEnd', initializeDatabaseData({ databaseVersion: configuration.databaseVersion }))

import oAuthInitializePortServer from 'appscript/class/port/oAuth/initializePortServer.js'
Application.eventEmitter.on('initializationEnd', oAuthInitializePortServer())

import webappUIInitializePortServer from 'appscript/class/port/webappUI/initializePortServer.js'
Application.eventEmitter.on('initializationEnd', webappUIInitializePortServer())

import staticContentInitializePortServer from 'appscript/class/port/staticContent/initializePortServer.js'
Application.eventEmitter.on('initializationEnd', staticContentInitializePortServer({ entrypointConditionKey: '78f91938-f9cf-4cbf-9bc8-f97836ff23dd'}))

import apiInitializePortServer from 'appscript/class/port/api/initializePortServer.js'
Application.eventEmitter.on('initializationEnd', apiInitializePortServer())

import websocketInitializePortServer from 'appscript/class/port/webSocket/initializePortServer.js'
Application.eventEmitter.on('initializationEnd', websocketInitializePortServer())

Application.initialize() // allows calling a child class from its parent class.

// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment

// TODO: Custom Dataset Schema/structure/blueprint, data document, csustom dataset type, custom fields, custom content type.
// TODO: Condition Tree:
// • Ability to decide insertion position of unit in subtree. e.g. before, after, first, last.
// • Check non immediate children for each insertion point to insert them in their correct destination.
// • Define unique key for each child, to allow insertion into other inserted children. i.e. extending existing trees with other trees and children. 

// TODO: Merge ReusableNestedUnit implementations and organize them according to the requirements like returned value and algorithm executed on the nested tree.