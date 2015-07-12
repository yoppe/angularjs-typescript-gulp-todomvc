# AngularJS, TypeScript, gulpを使ったTodoアプリ
Todoアプリの元は
[todomvc](https://github.com/tastejs/todomvc)の[TypeScript & AngularJS](http://todomvc.com/examples/typescript-angular/#/)バージョンです。

このTodoアプリをgulpで動く形に修正したのが、本リポジトリになります。

gulpの学習用に作りました。

## 使い方
cloneしたディレクトリで

```パッケージのインストール
$ npm install
```

```gulp実行
$ gulp
```

以上。
gulpを実行した段階で、ブラウザが立ち上がりtodoアプリが動作すると思います。


### gulpの挙動
指定ディレクトリのhtml,sass,tsファイルが編集・保存されるとブラウザが自動リロードするようになってます。

## その他

TypeScript & AngularJSとなると初期の環境構築のハードルが高く、なかなかちょっとしたアプリじゃ使いにくいと感じていました。

ちょっとしたWebアプリを作る際のベースになればと思い、gulpによる自動実行を作ってみました。

学習用のシードプロジェクトとして使えればと思い作りました。

Todoアプリの方に関しては[元のアプリ](https://github.com/tastejs/todomvc/tree/gh-pages/examples/typescript-angular)からほぼ変えてませんので、Todoアプリに関しては本家を見たほうが勉強になるかと思います。
ちなみにngRouteモジュールも使ってないかなりシンプルな実装になっています。
