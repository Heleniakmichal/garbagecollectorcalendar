CREATE MIGRATION m124yylrpeu5t72sozrpy6kojzpsgyxvvizbwii7oisqsrrp6rsxsa
    ONTO initial
{
  CREATE TYPE default::Location {
      CREATE REQUIRED PROPERTY nazwa: std::str;
  };
  CREATE TYPE default::GarbageCollection {
      CREATE REQUIRED LINK lokalizacja: default::Location;
      CREATE REQUIRED PROPERTY data_utworzenia: std::datetime;
      CREATE REQUIRED PROPERTY dzien: std::str;
      CREATE REQUIRED PROPERTY indeks: std::int64;
      CREATE REQUIRED PROPERTY miesiac: std::str;
      CREATE REQUIRED PROPERTY typ: std::str;
  };
};
