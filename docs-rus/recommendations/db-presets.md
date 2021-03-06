# Принципы создания ДБ - пресетов.

* Название пресета начинается с префикса `dp_` (Database Preset) и дальше английскими буквами
информативное имя пресета. В имени фразы отделяются дефисами, а смысловые группы фраз - подчеркиваниями.

Например: `dp_common`, `dp_assets_special-cases`. 

* Нужны универсальные пресеты, которые будут использоваться для большинства тестов,
и специфические пресеты, для тестирования частностей.

* Если непонятно название сущности, которую кто-то создал, можете улучшить название,
и поменять название в автотестах.

* Если автотестописателю непонятно название сущности, можно поменять это название и пересохранить пресет.
Принцип скаута и рефакторинги работают и здесь.

* По-возможности, названия и свойства сущностей в БД должно быть на английском языке,
чтобы было меньше различий между английской и русской версиями приложения.

* Имена сущностей должно быть информативными.
Смысл такой: у каждого писателя тескейсов должно быть понимание какие сущности он может
юзать для своих кейсов. Если там device1, user1, host1, то писатель не поймет что это,
и сделает свои user2, host2, и т.д., и будет мусорка.

* Набор сущностей, в идеале, должен иметь все типы значений.
