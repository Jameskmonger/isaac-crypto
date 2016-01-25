/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { HelloWorld } from '../src/helloworld';

test('hello world', (t) => {
  var hello = new HelloWorld();

  t.equal(hello.getHello(), 'hello');
  t.end();
});
