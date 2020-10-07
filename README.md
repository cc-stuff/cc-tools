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
 * `--output` &mdash; output file to write.
 
### ccimage

`ccimage` is a tool for bundling folders into one JSON file for
later usage in `ccrun` command.

Options:

 * `--folder` &mdash; folder to bundle;
 * `--output` &mdash; output file to write.

### ccrun

`ccrun` is a tool for running [Copy Cat](https://github.com/SquidDev-CC/copy-cat) in
a clean environment with a specific file system image.

This command uses [Playwright](https://playwright.dev/) to run Copy Cat.

Options:

 * `--fs` &mdash; JSON file system image prepared by `ccimage` command;
 * `--port` &mdash; port to listen to;
 * `--watch` &mdash; (optional) automatically reload Copy Cat when file system image changes.

## Contributing

When contributing to this repository, please first discuss the change
you wish to make via issue, email, or any other method with the
owners of this repository before making a change.
