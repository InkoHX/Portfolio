---
title: styled-componentsを使用したときの命名と構造
description: styled-componentsを使用して作ったスタイルコンポーネントを作るときに名前付けやファイル構造をどうするかについて
tags:
  - React
modifiedDate: 2020-06-26T02:45:30.000Z
createdDate: 2020-05-29T02:24:22.000Z
---

[React](/tags/reactjs)の勉強を真面目に始めて数週間経つのだが、**styled-components**を使用したときに付けるコンポーネントの名前付けにちょっと困っているので、どのような設計で名前を付けているののか少し調べてみた。

## 構造

```
src/
  ┗ components/
      ┗━━━━━━━ AppBar/
                ┗━━━━ styles.js
```

こういう感じの構造で、`styles.js` というファイルを作り管理する方法が多いらしい

## スタイルを拡張したコンポーネントには接頭辞に記号や決まった単語を使う

接頭辞に**決まった単語**または**決まった記号**を使って拡張したことを表したりする方法が良さそうに見えました。

私は記号を使うのはなんか嫌なので `Styled` を付けることにしています。

### 接頭辞に 決まった単語 を使用した場合

```js
const AppBar = styled.div`
  color: #999;
`

const StyledAppBar = styled(AppBar)`
  color: #fff;
`
```

`Styled` と付けてみました。ちょっと長いが私はこれが一番いいと思う。

長いと思う人は `S` だけでもいいかもしれない。(インタフェースで接頭辞に `I` を付けるみたいな感じ)

### 接頭辞に 記号 を使用した場合

`$` などの記号を使う。個人的に好きじゃない。

```js
const AppBar = styled.div`
  color: #789;
`

const $AppBar = styled(AppBar)`
  color: #123;
`
```

## まとめ

- `styles.js` というファイルを作り管理する方法が多いらしい（図は上記を参考に）
- 拡張したスタイルには**決まった記号や単語**を使用する

## あとがき

名前すら付けるのめんどくさい人は `styled-jsx` なんか良さそうじゃない? (よく見てないから分からないけど...)
