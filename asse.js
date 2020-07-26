'use strict';
const userNameIpt = document.getElementById('user-name');
const assessmentBtn = document.getElementById('assessment');
const resultDiv = document.getElementById('result-area');
const tweetDiv = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTML の要素
 */

function removeAllChildren(element) {
  while (element.firstChild) {
    // 子ども要素が有る限り削除
    element.removeChild(element.firstChild)
  }
}
assessmentBtn.onclick = () => {
  const userName = userNameIpt.value;
  if (userName.length === 0) {
    // 名前がからの時は処理を終了するガード句
    removeAllChildren(resultDiv);
    const he = document.createElement('h3');
    he.innerText= '@@@名前を入力してください@@@';
    resultDiv.appendChild(he);
    return;
  }
  // 診断結果表示エリア
  removeAllChildren(resultDiv)
  const h3 = document.createElement('h3');
  h3.innerText = 'あなたのいいところは、その、、、';
  resultDiv.appendChild(h3);

  const h2 = document.createElement('h2');
  const result = assessment(userName);
  h2.innerText = result;
  resultDiv.appendChild(h2)
  // TODO ツイートエリア
  removeAllChildren(tweetDiv)
  const a = document.createElement('a');
  const href =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたの長所') +
    '&ref_src=twsrc%5Etfw';
  a.setAttribute('href', href);
  // a.className = 'twitter-hashtag-button';
  a.setAttribute('class', 'twitter-hashtag-button');
  a.setAttribute('data-text', result);
  a.innerText = 'Tweet #あなたのいいところ';
  tweetDiv.appendChild(a);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDiv.appendChild(script);
};

userNameIpt.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentBtn.onclick();
  }
};

const answers = [
  `{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。`,
  `{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。`,
  `{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。`,
  `{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。`,
  `{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。`,
  `{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。`,
  `{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。`,
  `{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。`,
  `{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。`,
  `{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。`,
  `{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。`,
  `{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。`,
  `{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。`,
  `{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。`,
  `{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。`,
  `{userName}のいいところはその勇気があるところです。困難な場面でも、勇気をもって行動する{userName}の姿に皆が勇気づけられています。`,
  `{userName}のいいところはその慈愛さです。弱い者にめぐみや心をかけ大切にする{userName}は多くの人を救っています。`,
  `{userName}のいいところはその純粋さです。その純粋さそれがこそが{userName}自身の強みなのです。`,
  `{userName}のいいところはその闘志です。{userName}の闘志は永遠にいつまでも心の中で燃え続けています。`,
  `{userName}のいいところはつまり正義心です。どんなときも正しくあろうとする{userName}は誰も真似できない存在なのです。`,
  `{userName}のいいところはその大胆さです。引いてしまうような場面でも{userName}の大胆さによって乗り切る様に皆が勇気づけられています。`,
  `{userName}のいいところは自制心です。状況判断に優れ、どんな場面でもしっかりと衝動を抑えられる{userName}が皆から評価されています。`,
  '{userName}のいいところはその背中の大きさです。みんなが苦しい時に、{userName}の背中を見て、どんな困難な状況でも、みな自分を奮い立たせ半歩でも前に進む力に変えています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{userName\}/g, userName);
  result = result.replace(/いいところ/g, '長所');
  result = result.replace(/です/g, 'かな、多分'); 
  result = result.replace(/ます/g, 'そうやな、知らんけど');  //gがグローバル(global)で全体に
  return result;
}

// console.assert(assessment
//   ('a') === 'aのいいところは思いやりです。aに気をかけてもらった多くの人が感謝しています。',
//   '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
// console.assert(assessment
//   ('a') === 'aのいいところは思いやりです。bに気をかけてもらった多くの人が感謝しています。',
//   '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。');
// console.assert(assessment
//   ('a') === assessment('a'),
//   '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。');
// console.assert(assessment
//   ('a') === assessment('b'),
//   '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。');
