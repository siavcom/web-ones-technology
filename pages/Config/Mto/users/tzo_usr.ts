//////////////////////////////////////////////
// This class component was generated automatically by web-ones-technology
// BaseClass : component
// Class : tzo_usr
// Description : Time Zone
// Author : El Fer Blocks
// Creation : 2025-03-11
// Update Date  : 
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////

import { CAPTURECOMPONENT } from "@/classes/CaptureComponent";
// import { RowSource } from "~/classes/translationComponent/RowSource";
export class tzo_usr extends CAPTURECOMPONENT {

   constructor() {
      super()

      this.prop.Caption = 'Zona horaria'
      this.prop.BaseClass = 'comboBox'
      this.prop.RowSource = [[], [], []];
      this.prop.ColumnCount = 3;

      this.prop.ControlSource = 'vi_cap_db_users.tzo_usr'
      this.prop.Placeholder = 'Time Zone'
      this.prop.ToolTipText = 'Time Zone'
      this.prop.Capture = true
      this.prop.updateKey = false
      this.prop.ReadOnly = true


   }
   override init() {
      const items = [
         {
            "TimeZone": "Pacific/Midway",
            "UtcOffset": "-11:00",
            "name": "Midway Island, American Samoa"
         },
         {
            "TimeZone": "Pacific/Honolulu",
            "UtcOffset": "-10:00",
            "name": "Hawaii"
         },
         {
            "TimeZone": "America/Anchorage",
            "UtcOffset": "-08:00",
            "name": "Alaska"
         },
         {
            "TimeZone": "America/Tijuana",
            "UtcOffset": "-07:00",
            "name": "Baja California"
         },
         {
            "TimeZone": "America/Los_Angeles",
            "UtcOffset": "-07:00",
            "name": "Pacific Time US and Canada)"
         },
         {
            "TimeZone": "America/Phoenix",
            "UtcOffset": "-07:00",
            "name": "Arizona"
         },
         {
            "TimeZone": "America/Chihuahua",
            "UtcOffset": "-06:00",
            "name": "Chihuahua, La Paz, Mazatlan"
         },
         {
            "TimeZone": "America/Denver",
            "UtcOffset": "-06:00",
            "name": "Mountain Time US and Canada)"
         },
         {
            "TimeZone": "America/Belize",
            "UtcOffset": "-06:00",
            "name": "Central America"
         },
         {
            "TimeZone": "America/Chicago",
            "UtcOffset": "-05:00",
            "name": "Central Time US and Canada)"
         },
         {
            "TimeZone": "America/Mexico_City",
            "UtcOffset": "-05:00",
            "name": "Guadalajara, Mexico City, Monterrey"
         },
         {
            "TimeZone": "America/Regina",
            "UtcOffset": "-06:00",
            "name": "Saskatchewan"
         },
         {
            "TimeZone": "America/Bogota",
            "UtcOffset": "-05:00",
            "name": "Bogota, Lima, Quito"
         },
         {
            "TimeZone": "America/Jamaica",
            "UtcOffset": "-05:00",
            "name": "Kingston, George Town"
         },
         {
            "TimeZone": "America/New_York",
            "UtcOffset": "-04:00",
            "name": "Eastern Time US and Canada)"
         },
         {
            "TimeZone": "America/Indiana/Indianapolis",
            "UtcOffset": "-04:00",
            "name": "Indiana East)"
         },
         {
            "TimeZone": "America/Caracas",
            "UtcOffset": "-04:30",
            "name": "Caracas"
         },
         {
            "TimeZone": "America/Asuncion",
            "UtcOffset": "-03:00",
            "name": "Asuncion"
         },
         {
            "TimeZone": "America/Halifax",
            "UtcOffset": "-03:00",
            "name": "Atlantic Time Canada)"
         },
         {
            "TimeZone": "America/Cuiaba",
            "UtcOffset": "-04:00",
            "name": "Cuiaba"
         },
         {
            "TimeZone": "America/Manaus",
            "UtcOffset": "-04:00",
            "name": "Georgetown, La Paz, Manaus, San Juan"
         },
         {
            "TimeZone": "America/St_Johns",
            "UtcOffset": "-02:30",
            "name": "Newfoundland and Labrador"
         },
         {
            "TimeZone": "America/Sao_Paulo",
            "UtcOffset": "-03:00",
            "name": "Brasilia"
         },
         {
            "TimeZone": "America/Buenos_Aires",
            "UtcOffset": "-03:00",
            "name": "Buenos Aires"
         },
         {
            "TimeZone": "America/Cayenne",
            "UtcOffset": "-03:00",
            "name": "Cayenne, Fortaleza"
         },
         {
            "TimeZone": "America/Godthab",
            "UtcOffset": "-02:00",
            "name": "Greenland"
         },
         {
            "TimeZone": "America/Montevideo",
            "UtcOffset": "-03:00",
            "name": "Montevideo"
         },
         {
            "TimeZone": "America/Bahia",
            "UtcOffset": "-03:00",
            "name": "Salvador"
         },
         {
            "TimeZone": "America/Santiago",
            "UtcOffset": "-03:00",
            "name": "Santiago"
         },
         {
            "TimeZone": "America/Noronha",
            "UtcOffset": "-02:00",
            "name": "Mid-Atlantic"
         },
         {
            "TimeZone": "Atlantic/Azores",
            "UtcOffset": "+00:00",
            "name": "Azores"
         },
         {
            "TimeZone": "Atlantic/Cape_Verde",
            "UtcOffset": "-01:00",
            "name": "Cape Verde Islands"
         },
         {
            "TimeZone": "Europe/London",
            "UtcOffset": "+01:00",
            "name": "Dublin, Edinburgh, Lisbon, London"
         },
         {
            "TimeZone": "Africa/Casablanca",
            "UtcOffset": "+01:00",
            "name": "Casablanca"
         },
         {
            "TimeZone": "Africa/Monrovia",
            "UtcOffset": "+00:00",
            "name": "Monrovia, Reykjavik"
         },
         {
            "TimeZone": "Europe/Amsterdam",
            "UtcOffset": "+02:00",
            "name": "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
         },
         {
            "TimeZone": "Europe/Belgrade",
            "UtcOffset": "+02:00",
            "name": "Belgrade, Bratislava, Budapest, Ljubljana, Prague"
         },
         {
            "TimeZone": "Europe/Brussels",
            "UtcOffset": "+02:00",
            "name": "Brussels, Copenhagen, Madrid, Paris"
         },
         {
            "TimeZone": "Europe/Warsaw",
            "UtcOffset": "+02:00",
            "name": "Sarajevo, Skopje, Warsaw, Zagreb"
         },
         {
            "TimeZone": "Africa/Algiers",
            "UtcOffset": "+01:00",
            "name": "West Central Africa"
         },
         {
            "TimeZone": "Africa/Windhoek",
            "UtcOffset": "+02:00",
            "name": "Windhoek"
         },
         {
            "TimeZone": "Europe/Athens",
            "UtcOffset": "+03:00",
            "name": "Athens, Bucharest"
         },
         {
            "TimeZone": "Asia/Beirut",
            "UtcOffset": "+03:00",
            "name": "Beirut"
         },
         {
            "TimeZone": "Africa/Cairo",
            "UtcOffset": "+02:00",
            "name": "Cairo"
         },
         {
            "TimeZone": "Asia/Damascus",
            "UtcOffset": "+03:00",
            "name": "Damascus"
         },
         {
            "TimeZone": "EET",
            "UtcOffset": "+03:00",
            "name": "Eastern Europe"
         },
         {
            "TimeZone": "Africa/Harare",
            "UtcOffset": "+02:00",
            "name": "Harare, Pretoria"
         },
         {
            "TimeZone": "Europe/Helsinki",
            "UtcOffset": "+03:00",
            "name": "Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius"
         },
         {
            "TimeZone": "Asia/Istanbul",
            "UtcOffset": "+03:00",
            "name": "Istanbul"
         },
         {
            "TimeZone": "Asia/Jerusalem",
            "UtcOffset": "+03:00",
            "name": "Jerusalem"
         },
         {
            "TimeZone": "Europe/Kaliningrad",
            "UtcOffset": "+02:00",
            "name": "Kaliningrad"
         },
         {
            "TimeZone": "Africa/Tripoli",
            "UtcOffset": "+02:00",
            "name": "Tripoli"
         },
         {
            "TimeZone": "Asia/Amman",
            "UtcOffset": "+03:00",
            "name": "Amman"
         },
         {
            "TimeZone": "Asia/Baghdad",
            "UtcOffset": "+03:00",
            "name": "Baghdad"
         },
         {
            "TimeZone": "Asia/Kuwait",
            "UtcOffset": "+03:00",
            "name": "Kuwait, Riyadh"
         },
         {
            "TimeZone": "Europe/Minsk",
            "UtcOffset": "+03:00",
            "name": "Minsk"
         },
         {
            "TimeZone": "Europe/Moscow",
            "UtcOffset": "+03:00",
            "name": "Moscow, St. Petersburg, Volgograd"
         },
         {
            "TimeZone": "Africa/Nairobi",
            "UtcOffset": "+03:00",
            "name": "Nairobi"
         },
         {
            "TimeZone": "Asia/Tehran",
            "UtcOffset": "+03:30",
            "name": "Tehran"
         },
         {
            "TimeZone": "Asia/Muscat",
            "UtcOffset": "+04:00",
            "name": "Abu Dhabi, Muscat"
         },
         {
            "TimeZone": "Asia/Baku",
            "UtcOffset": "+05:00",
            "name": "Baku"
         },
         {
            "TimeZone": "Europe/Samara",
            "UtcOffset": "+04:00",
            "name": "Izhevsk, Samara"
         },
         {
            "TimeZone": "Indian/Mauritius",
            "UtcOffset": "+04:00",
            "name": "Port Louis"
         },
         {
            "TimeZone": "Asia/Tbilisi",
            "UtcOffset": "+04:00",
            "name": "Tbilisi"
         },
         {
            "TimeZone": "Asia/Yerevan",
            "UtcOffset": "+04:00",
            "name": "Yerevan"
         },
         {
            "TimeZone": "Asia/Kabul",
            "UtcOffset": "+04:30",
            "name": "Kabul"
         },
         {
            "TimeZone": "Asia/Tashkent",
            "UtcOffset": "+05:00",
            "name": "Tashkent, Ashgabat"
         },
         {
            "TimeZone": "Asia/Yekaterinburg",
            "UtcOffset": "+05:00",
            "name": "Ekaterinburg"
         },
         {
            "TimeZone": "Asia/Karachi",
            "UtcOffset": "+05:00",
            "name": "Islamabad, Karachi"
         },
         {
            "TimeZone": "Asia/Kolkata",
            "UtcOffset": "+05:30",
            "name": "Chennai, Kolkata, Mumbai, New Delhi"
         },
         {
            "TimeZone": "Asia/Colombo",
            "UtcOffset": "+05:30",
            "name": "Sri Jayawardenepura"
         },
         {
            "TimeZone": "Asia/Katmandu",
            "UtcOffset": "+05:45",
            "name": "Kathmandu"
         },
         {
            "TimeZone": "Asia/Almaty",
            "UtcOffset": "+06:00",
            "name": "Astana"
         },
         {
            "TimeZone": "Asia/Dhaka",
            "UtcOffset": "+06:00",
            "name": "Dhaka"
         },
         {
            "TimeZone": "Asia/Novosibirsk",
            "UtcOffset": "+06:00",
            "name": "Novosibirsk"
         },
         {
            "TimeZone": "Asia/Rangoon",
            "UtcOffset": "+06:30",
            "name": "Yangon Rangoon)"
         },
         {
            "TimeZone": "Asia/Bangkok",
            "UtcOffset": "+07:00",
            "name": "Bangkok, Hanoi, Jakarta"
         },
         {
            "TimeZone": "Asia/Krasnoyarsk",
            "UtcOffset": "+07:00",
            "name": "Krasnoyarsk"
         },
         {
            "TimeZone": "Asia/Chongqing",
            "UtcOffset": "+08:00",
            "name": "Beijing, Chongqing, Hong Kong SAR, Urumqi"
         },
         {
            "TimeZone": "Asia/Irkutsk",
            "UtcOffset": "+08:00",
            "name": "Irkutsk"
         },
         {
            "TimeZone": "Asia/Kuala_Lumpur",
            "UtcOffset": "+08:00",
            "name": "Kuala Lumpur, Singapore"
         },
         {
            "TimeZone": "Australia/Perth",
            "UtcOffset": "+08:00",
            "name": "Perth"
         },
         {
            "TimeZone": "Asia/Taipei",
            "UtcOffset": "+08:00",
            "name": "Taipei"
         },
         {
            "TimeZone": "Asia/Ulaanbaatar",
            "UtcOffset": "+08:00",
            "name": "Ulaanbaatar"
         },
         {
            "TimeZone": "Asia/Tokyo",
            "UtcOffset": "+09:00",
            "name": "Osaka, Sapporo, Tokyo"
         },
         {
            "TimeZone": "Asia/Seoul",
            "UtcOffset": "+09:00",
            "name": "Seoul"
         },
         {
            "TimeZone": "Asia/Yakutsk",
            "UtcOffset": "+09:00",
            "name": "Yakutsk"
         },
         {
            "TimeZone": "Australia/Adelaide",
            "UtcOffset": "+10:30",
            "name": "Adelaide"
         },
         {
            "TimeZone": "Australia/Darwin",
            "UtcOffset": "+09:30",
            "name": "Darwin"
         },
         {
            "TimeZone": "Australia/Brisbane",
            "UtcOffset": "+10:00",
            "name": "Brisbane"
         },
         {
            "TimeZone": "Australia/Canberra",
            "UtcOffset": "+11:00",
            "name": "Canberra, Melbourne, Sydney"
         },
         {
            "TimeZone": "Pacific/Guam",
            "UtcOffset": "+10:00",
            "name": "Guam, Port Moresby"
         },
         {
            "TimeZone": "Australia/Hobart",
            "UtcOffset": "+11:00",
            "name": "Hobart"
         },
         {
            "TimeZone": "Asia/Magadan",
            "UtcOffset": "+10:00",
            "name": "Magadan"
         },
         {
            "TimeZone": "Asia/Vladivostok",
            "UtcOffset": "+10:00",
            "name": "Vladivostok, Magadan"
         },
         {
            "TimeZone": "Asia/Srednekolymsk",
            "UtcOffset": "+11:00",
            "name": "Chokirdakh"
         },
         {
            "TimeZone": "Pacific/Guadalcanal",
            "UtcOffset": "+11:00",
            "name": "Solomon Islands, New Caledonia"
         },
         {
            "TimeZone": "Asia/Anadyr",
            "UtcOffset": "+12:00",
            "name": "Anadyr, Petropavlovsk-Kamchatsky"
         },
         {
            "TimeZone": "Pacific/Auckland",
            "UtcOffset": "+13:00",
            "name": "Auckland, Wellington"
         },
         {
            "TimeZone": "Pacific/Fiji",
            "UtcOffset": "+12:00",
            "name": "Fiji Islands, Kamchatka, Marshall Islands"
         },
         {
            "TimeZone": "Pacific/Tongatapu",
            "UtcOffset": "+13:00",
            "name": "Nuku'alofa"
         },
         {
            "TimeZone": "Pacific/Apia",
            "UtcOffset": "+14:00",
            "name": "Samoa"
         }
      ]

      // Ordenaos por UctOffset . Cambiaos a numero para ordenarlo bien
      items.sort((a, b) => {
         const nameA = Number(a.UtcOffset)     //.toUpperCase(); // ignore upper and lowercase
         const nameB = Number(b.UtcOffset)     //.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
            return -1;
         }
         if (nameA > nameB) {
            return 1;
         }

         // names must be equal
         return 0;
      });


      let i = 0
      for (const item of items) {
         this.prop.RowSource[0][i] = item.name
         this.prop.RowSource[1][i] = item.UtcOffset
         this.prop.RowSource[2][i] = item.TimeZone
         i++
      }

      //this.prop.RowSource = tzo_usr

      this.prop.BoundColumn = 2;
      this.prop.ColumnWidths = "128px,45px,200px";
      this.prop.RowSourceType = 5; // 5-Array

   }

   override async when_old() {

      const data = await scatter(['key_pri'], 'vi_cap_db_users')
      if (data.key_pri == 0) {
         //let Valor = (new Date().getTimezoneOffset() / 60).toString()
         let Valor = (new Date().toString().match(/([-\+][0-9]+)\s/)[1]).slice(0, 3) + ':' + (new Date().toString().match(/([-\+][0-9]+)\s/)[1]).slice(-2)
         //Valor = Valor.slice(0, 3) + ':' + Valor.slice(-2)
         this.prop.Value = Valor

         /*
         Valor = Valor.replaceAll('.', ':')
         if (Valor.indexOf(':') == -1) {
            Valor = Valor + ':0'

            if (Valor.indexOf('-') >= 0) {
               Valor = Valor.replaceAll('-', '')
               if (Valor.length == 3) Valor = '0' + Valor
            } else {
               if (Valor.length == 3) Valor = '0' + Valor
               Valor = '+' + Valor
            }
            Valor = Valor + '0'
            Valor = Valor.slice(0, 5)  //aumentamos ceros finales

            this.prop.Value = Valor
            console.log('2)>>>>>>tzo_usr when Valor', Valor)

         }
*/
      }
      return true
   }
}