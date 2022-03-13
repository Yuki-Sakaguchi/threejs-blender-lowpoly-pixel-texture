# threejs-blender-lowpoly-pixel-texture
YouTubeを参考にBlenderで作ったglbファイルをthree.jsで表示する
テクスチャはドットの画像

## demo
https://yuki-sakaguchi.github.io/threejs-blender-lowpoly-pixel-texture/dist/

https://user-images.githubusercontent.com/16290220/158067618-f6c58d3a-981e-4bc7-9b98-36b586accd9d.mov

## メモ
- 基本、 blender 上で全て完結した（モデリング、テクスチャのペイントなど）
- three.jsで表示するのも通常通り `glb` ファイルを読み込むだけでテクスチャまで問題なく表示できた
  - ただ、モデルがどうしても暗くなっちゃうので↓を足した

tsでエラーがでちゃうので無視する用のコメントも追加
これを足すとちょっとは明るくなるけど、まだ完全に明るくないから何かもっとやる必要があるのかも...

```ts
//@ts-ignore
renderer.gammaOutput = true;
```


## 参考
https://www.youtube.com/watch?v=yh6785-ff8k&list=PLF92zAMQJ1_E5bOPFkTDbdQoTFlu0uAkc
