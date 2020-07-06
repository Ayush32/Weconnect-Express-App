/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const kue =  require('kue');

 const queue = kue.createQueue();

 module.exports = queue;