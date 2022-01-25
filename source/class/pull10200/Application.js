/* ************************************************************************

   Copyright: 2022 undefined

   License: MIT license

   Authors: undefined

************************************************************************ */

/**
 * This is the main application class of "pull10200"
 *
 * @asset(pull10200/*)
 */
qx.Class.define("pull10200.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      function makeSelectBox(){
        var box = new qx.ui.form.SelectBox();
        for (var i=0; i<50; i++) {
          box.add(new qx.ui.form.ListItem("Free text", "@MaterialIcons/text_fields/12"));
        }
        return box;
      }

      // Create a button
      var button1 = new qx.ui.form.Button("Click me", "pull10200/test.png");

      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});

      // Add an event listener
      button1.addListener("execute", function() {
        for(var i=0; i<3; i++){
          mainSelect.setSelection([mainSelect.getChildren()[i]]);
        }
      });

      var mainSelect = makeSelectBox();
      doc.add(mainSelect, {left: 100, top: 100});

      var vBox = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      doc.add(vBox, { left: 100, top: 130 });
      // Add an event listener
      mainSelect.addListener("changeSelection", ()=>{
        var startTime = performance.now()
        vBox.removeAll();
        /* eslint no-alert: "off" */
        for (let i = 0; i < 20; i++) {
          vBox.add(makeSelectBox());
        }
        var endTime = performance.now();
        alert(endTime - startTime);
      });
    }
  }
});