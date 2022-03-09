<template>
  <div>
    <ul>
      <li>{{$T("asn 单号")}}</li>
      <li>
        <h3>形态1</h3>
        <div>{{ $T("形态1") }}</div>
      </li>
      {{ $T("A形态") }}
      <li>
        <h3>形态2</h3>
        <div>{{ $T("形态2") }}-{{ $T("同一行") }}</div>
      </li>
      <li>
        <h3>形态3</h3>
        <div>{{ $T("形态3(包含括号)成功") }}</div>
      </li>
      <li>
        <h3>形态4</h3>
        <div>{{ $T("形态4{n}", { n: "动态参数" }) }}</div>
      </li>
      <li>
        <h3>形态5</h3>
        <div>{{ $T(
          "形态5,换行"
          ) }}</div>
      </li>
      <li>
        <h3>形态6</h3>
        <div>{{ $T(
          "形态6,动态参数换行{n}",
           { n: 5 }
           )}}</div>
      </li>
       <li>
        <h3>形态7</h3>
        <div>{{ $T() }}(123)</div>
      </li>
        <li>
        <h3>形态7</h3>
        <div>{{ $T("A form") }}(123)</div>
      </li>$T("Same line")
    </ul>
  </div>
</template>
