# Piano scales, chords and theory with practical examples

Put this folder in location where some web server is installed. For example, if _Nginx_ web server is installed on _macOS_ using homebrew formula installation, then copy this folder to "piano-keys" folder:

-   for homebrew nginx folder

    ```shell
    /opt/homebrew/opt/nginx/html/piano-keys
    ```

    ```shell
    $HOMEBREW_PREFIX/opt/nginx/html/piano-keys
    ```

-   for homebrew general web server www folder

    ```shell
    /opt/homebrew/var/www/piano-keys
    ```

    ```shell
    $HOMEBREW_PREFIX/var/www/piano-keys
    ```

Then open web browser with url address: <br /> http://localhost:8080/piano-keys/

Otherwise, copy this folder to folder where another web server is installed and repeat the same procedure.

## Notes for code formatting

If prettier js is used for code formatting in Visual Studio Code, then it will not be applied properly for tab indentations and other prettier configurations because configuration file is not detected outside of home folder. This folder should be copied to the local web server and that path is not inside home directory and in that way, prettier will not see configuration file. Prettier configuration file can be set from Visual Studio Code Settings directly, but it will still not work. To make it work on web server, then open default configuration file inside homebrew installation folder for _macOS_:

```shell
/opt/homebrew/.editorconfig
```

and change line

```shell
indent_size = 2
```

to

```shell
indent_size = 4
```

Then prettier configuration file will not be loaded, but default configuration file for code formatter will be used instead.
