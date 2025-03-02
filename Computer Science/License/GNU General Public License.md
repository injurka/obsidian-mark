Вначале хотелось бы пояснить что такое «GNU». GNU расшифровывается как «GNU's not UNIX» — это рекурсивный акроним придуманный Ричардом Столлманом, известным идеологом открытого и свободного программного обеспечения. Такое название было придумано для операционной системы, которую в 80-х годах разрабатывал Столлман. История GNU заслуживает отдельной статьи поэтому я перейду сразу к делу.  
  
GNU General Public License или открытое лицензионное соглашение GNU — это лицензия, первый вариант которой датируется 1 февраля 1989 года (википедия сообщает о 1988 г, но я считаю дату которая стоит на [оригинале](http://www.gnu.org/licenses/old-licenses/gpl-1.0.html)). На сегодняшний день существует четыре варианта лицензии, которые нумеруются в порядке появления.  

Самое важное, что вам нужно знать о GNU GPL это: 

- Вы должны предоставить для изучения исходный код вашей программы, даже если распространяете продукт в скомпилированном виде.
- Если вы использовали в вашем проекте ПО, лицензированное GNU GPL, конечный продукт также должен быть лицензирован GNU GPL. То же касается модификации и распространения версий чужого кода.

---

## GNU GPL v1.0

Основными позициями GNU GPL v1.0 стали следующие требования:  

- предоставление исходных кодов, доступных для изучения, к бинарным кодам публикуемым с данной лицензией;
- наследование лицензии в случае модификации исходного кода, то есть модифицированный или объединенный с другим код в результате так же должен быть выпущен под лицензией GNU GPL, следовательно, быть доступным для модификации любым желающим.

Данные требования служат по сути одной цели, предотвратить действие закона об авторском праве на распространяемое открытое программное обеспечение, который запрещает модифицировать и использовать чужой код.  
  

---

## GNU GPL v2.0

Вторая версия лицензии [датируется](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html) 1991 годом и основным мотивом провозглашает (согласно wiki) принцип «Liberty or Death» (Свобода или Смерть). Этот принцип заключен в седьмом и восьмом пункте соглашения:  
  
Лицензиат не освобождается от исполнения обязательств в соответствии с настоящей Лицензией в случае, если в результате решения суда или заявления о нарушении исключительных прав или в связи с наступлением иных обстоятельств, не связанных непосредственно с нарушением исключительных прав, на Лицензиата на основании решения суда, договора или ином основании возложены обязательства, которые противоречат условиям настоящей Лицензии. В этом случае Лицензиат не вправе распространять экземпляры Программы, если он не может одновременно исполнить условия настоящей Лицензии и возложенные на него указанным выше способом обязательства. Например, если по условиям лицензионного соглашения сублицензиатам не может быть предоставлено право бесплатного распространения экземпляров Программы, которые они приобрели напрямую или через третьих лиц у Лицензиата, то в этом случае Лицензиат обязан отказаться от распространения экземпляров Программы.
  
Если любое положение настоящего пункта при наступлении конкретных обстоятельств будет признано недействительным или неприменимым, настоящий пункт применяется за исключением такого положения. Настоящий пункт применяется в целом при прекращении вышеуказанных обстоятельств или их отсутствии.  
  
Целью данного пункта не является принуждение Лицензиата к нарушению патента или заявления на иные права собственности или к оспариванию действительности такого заявления. Единственной целью данного пункта является защита неприкосновенности системы распространения свободного программного обеспечения, которая обеспечивается за счет общественного лицензирования. Многие люди внесли свой щедрый вклад в создание большого количества программного обеспечения, которое распространяется через данную систему в надежде на ее длительное и последовательное применение. Лицензиат не вправе вынуждать автора распространять программное обеспечение через данную систему. Право выбора системы распространения программного обеспечения принадлежит исключительно его автору.  
  
Настоящий пункт 7 имеет целью четко определить те цели, которые преследуют все остальные положения настоящей Лицензии.  
  
В том случае если распространение и/или использование Программы в отдельных государствах ограничено соглашениями в области патентных или авторских прав, первоначальный правообладатель, распространяющий Программу на условиях настоящей Лицензии, вправе ограничить территорию распространения Программы, указав только те государства, на территории которых допускается распространение Программы без ограничений, обусловленных такими соглашениями. В этом случае такое указание в отношении территорий определенных государств признается одним из условий настоящей Лицензии._[1]  
  
Как можно заметить, основным мотивом служит следующий принцип: программа не должна распространяться, если конечный пользователь не может в полной мере использовать свое право на модификацию и распространение под той же самой лицензией.  

---

## GNU Lesser GPL v2.1
  
Данная версия лицензии датируется 1999 годом и содержит одно огромное отличие от обычной лицензии GNU GPL: предназначенная для библиотек, лицензия позволяет использовать их в проприетарном программном обеспечении. Например, библиотеки GNU C распространяются под лицензией GNU Lesser GPL v2.1, для того, чтобы сторонние разработчики могли использовать их в своем ПО, свободном или коммерческом.  
  
---

## GNU GPL v3.0

Последняя на сегодняшний день версия GPL, которая вышла в 2007 году. Изменения, внесенные в лицензию, были призваны оградить пользователей лицензии от судебных исков связанных с патентами, теперь создатели программы не могу подать в суд на пользователя. GPL 3.0 запрещает применять лицензию к программному обеспечению, которое запрещено «обходить» некоторыми законами и директивами (Digital Millennium Copyright Act и the European Union Copyright Directive). То есть, нельзя выпустить под лицензией любое ПО, попадающее под действие этих директив. Таким образом, GPL 3.0 заботится о том, чтобы любое ПО, выпущенное под ее лицензией, можно было свободно модифицировать, обходить или изменять.  
  
Кроме того, GPL 3.0 борется с таким явлением как «тивоизация», когда устройство, на котором установлено программное обеспечение под лицензией GPL, не позволяет вам в силу различных причин модифицировать его. GPL v3.0 запрещает тивоизацию для товаров народного потребления (оставляя возможность тивоизации для медицинских и других важных устройств).  
  
Вместе с GPL 3.0 вышла так же обновленная версия GNU Lesser GPL 3.0, которая продолжает отличаться тем, что позволяет использовать свободные библиотеки в закрытом ПО.  
