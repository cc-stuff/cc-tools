# lua-cc-tools

A set of tools for bundling and testing Lua programs written for
[CCTweaked](https://tweaked.cc/) / [ComputerCraft](http://www.computercraft.info/) Minecraft mods.

Contains a bundled version of SquidDev's [Copy Cat](https://github.com/SquidDev-CC/copy-cat).

## Tools

### ccbundle

`ccbundle` is a tool that can be used to bundle multiple Lua files together.

It works by tracing all `require` function calls and inlining required files.

Options:

 * `--entry` &mdash; entry Lua file;
 * `--output` &mdash; output file to write;
 * `--project` &mdash; (optional) [project file](#project-files).

When present, `--project` option makes all other options ignored and
thus not mandatory.

### ccpack

`ccpack` is a tool for bundling folders into one JSON file for
later usage in `ccrun` command.

Options:

 * `--folder` &mdash; folder to bundle;
 * `--output` &mdash; output JSON image file to write.

### ccunpack

`ccunpack` does the reverse operation of `ccpack`: it unpacks all
files from a certain JSON image into the output directory. Existing
files are always overridden, so be careful with this tool and always use
version control systems (e.g. `git`) to track changes in your code.

Options:

 * `--fs` &mdash; JSON image file to read;
 * `--output` &mdash; target directory to extract files to.

### ccrun

`ccrun` is a tool for running [Copy Cat](https://github.com/SquidDev-CC/copy-cat) in
a clean environment with a specific file system image.

This command uses [Playwright](https://playwright.dev/) to run Copy Cat.

Options:

 * `--port` &mdash; port to listen to;
 * `--watch` &mdash; (optional) automatically reload Copy Cat when
 file system image changes (only compatible with `--fs` option);
 * `--fs` &mdash; (optional) JSON file system image prepared by
 `ccimage` command;
 * `--folder` &mdash; (optional) run Copy Cat in certain real file
 system folder, meaning pack it into a temporary JSON image on start
 and unpack back when the program is done running.

Although `--fs` and `--folder` options are marked as optional, you really
should choose one.

### cctest

`cctest` is a tool for running automated tests written with a built-in
[testing framework](#testing-framework). This command works similar to `ccrun`, but it
automatically runs all tests and presents the output in a readable format
in the host terminal.

Options:

 * `--project` &mdash; [project file](#project-files);
 * `--testsGrep` &mdash; (optional) Lua `string.match` pattern for
 target tests (runs all tests by default);
 * `--suitsGrep` &mdash; (optional) Lua `string.match` pattern for
 target suites (scans all suites by default).

To be able to use this tool, you need to create a
[project file](#project-files) and configure in a
[certain way](#usage-with-cctest)

## Project files

Series of Lua files can be grouped into projects, described by JSON
files in a specific format:

```json
{
    "entry": "path/to/entry.lua",
    "output": "dist/path/to/bundle.lua",
    "references": {
        "other-project": "path/to/other/project.json"
    }
}
```

In this example:

 * `entry: string` &mdash; path to the main entry file, the same as
 you'd pass as `--entry` option to [ccbundle](#ccbundle);
 * `output: string` &mdash; path to the destination bundled file, the
 same as you'd pass as `--output` option to [ccbundle](#ccbundle);
 * `references: Object<string, string>` &mdash; (optional) a map of
 dependant projects that need to be build alongside the main project.

### Usage with cctest

In order to be able to use [cctest](#cctest), another section needs to
be defined:

```json
{
    "testMatch": [
        "**/*.test.lua"
    ]
}
```

In this example:

 * `testMatch: string[]` &mdash; array of
 [glob-like](https://www.npmjs.com/package/glob) patterns matching
 your project's tests.

Please note that you can't use `references` and `testMatch` in the same
project file.

## Testing framework

This toolset also includes a testing framework for ComputerCraft
applications. It is automatically loaded by [cctest](#cctest) and
provides a way to describe tests and test suites in a certain way.

If you know [Jest](https://jestjs.io/), this framework can seem
familiar.

### Basics

Every test written with this framework should belong to a test suite.

A test suite is a series of tests with one name, described in a single
file.

Example:

```lua
describe("Math", function()

    beforeEach(function()
        print("I run before each test")
    end)
    
    test("add", function()
        expect(5 + 7).toBe(12) -- Will pass
    end)

    test("subtract", function()
        expect(5 - 7).toBe(1) -- Will fail
    end)

end)
```

### describe(sSuiteName, fSuite)

Defines a test suite. This function is available in every test file.

Arguments:

 * `sSuiteName: string` &mdash; name of the suite;
 * `fSuite: function` &mdash; function that implements the suite,
 meaning it contains all the `test()` calls that define individual
 tests.

Returns: `nil`.

### test(sTestName, fTest)

Defines a test. This function is available in every suite environment.

Arguments:

 * `sTestName: string` &mdash; name of the test;
 * `fTest: function` &mdash; function containing actual code of the test.

Returns: `nil`.

### expect(aValue)

Creates an assertion. This function is available in every test.

Arguments:

 * `aValue: any` &mdash; value to assert.

Returns: [assertion table](#assertion-tables).

### beforeAll, beforeEach, afterAll, afterEach

Series of helpers for running certain code on various stages of
running tests.

Arguments:

 * `fCode: function` &mdash; function to call.

Returns: `nil`.

### Assertion tables

This testing framework supports behavior-driven
[expect-style](https://www.chaijs.com/guide/styles/) interface for
assertions in tests that is exposed through [expect](#expectavalue)
function.

This function returns a table with a set of assertion methods that
are used to validate the given value.

Example:

```lua
expect(2).toBeTruthy() -- Will pass
expect("fork").toBe("knife") -- Will fail the test
```

A standard assertion table has the following methods:

 * `toBe(bValue)` &mdash; checks if expected and given values
 are the same (`expected == bValue`);
 * `toEqual(bValue)` &mdash; checks if expected and given values
 are equal, meaning `expected == bValue` for primitives and deep
 comparison for tables;
 * `toBeTruthy()` &mdash; checks if expected value would count
 as `true` in an `if (expected)` check;
 * `toBeFalsy()` &mdash; checks if expected value would count
 as `false` in an `if (expected)` check;
 * `toBeNil()` &mdash; checks if expected value is nil.

In addition to that, a standard assertion table also has the following
chaining combinators:

 * `notTo` &mdash; returns an inverted assertion table, meaning that
 all it's assertions fail if the original assertion is true.

A practical example with `notTo` would look like this:

```lua
expect(true).toBeTruthy() -- Will pass
expect(true).notTo.toBeFalsy() -- Will also pass
```

## Contributing

When contributing to this repository, please first discuss the change
you wish to make via issue, email, or any other method with the
owners of this repository before making a change.

Any participation is welcome!
