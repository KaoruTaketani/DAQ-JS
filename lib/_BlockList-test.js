import { strictEqual } from 'assert';
import { BlockList } from 'net';
import { test } from 'node:test';

test('localhost is blocked', () => {
    const blockList = new BlockList()

    blockList.addRange('0.0.0.0', '255.255.255.255', 'ipv4');
    blockList.addRange('::', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ipv6');

    strictEqual(blockList.check('126.0.0.1'), true)
    strictEqual(blockList.check('126.0.0.1', 'ipv6'), false)
    strictEqual(blockList.check('127.0.0.1'), true)
    strictEqual(blockList.check('127.0.0.1', 'ipv6'), false)
    strictEqual(blockList.check('::1'), false)
    strictEqual(blockList.check('::1', 'ipv6'), true)
    strictEqual(blockList.check('::2'), false)
    strictEqual(blockList.check('::2', 'ipv6'), true)
})

test('localhost is allowed', () => {
    const blockList = new BlockList()

    blockList.addRange('0.0.0.0', '126.255.255.255', 'ipv4');
    blockList.addRange('128.0.0.0', '255.255.255.255', 'ipv4');
    blockList.addRange('::', '::0', 'ipv6');
    blockList.addRange('::2', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ipv6');

    strictEqual(blockList.check('126.0.0.1'), true)
    strictEqual(blockList.check('126.0.0.1', 'ipv6'), false)
    strictEqual(blockList.check('127.0.0.1'), false)
    strictEqual(blockList.check('127.0.0.1', 'ipv6'), false)
    strictEqual(blockList.check('::1'), false)
    strictEqual(blockList.check('::1', 'ipv6'), false)
    strictEqual(blockList.check('::2'), false)
    strictEqual(blockList.check('::2', 'ipv6'), true)
})
