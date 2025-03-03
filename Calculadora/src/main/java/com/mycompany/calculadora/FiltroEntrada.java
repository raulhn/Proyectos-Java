/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.calculadora;

import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.DocumentFilter;

/**
 *
 * @author Usuario
 */

//https://stackoverflow.com/questions/11093326/restricting-jtextfield-input-to-integers
public class FiltroEntrada extends DocumentFilter{
    
    private Calculadora calculadora;
    
    public FiltroEntrada(Calculadora calculadora)
    {
        this.calculadora = calculadora;
    }
   
    
      private boolean test(String text) {
      try {
         Double.parseDouble(text);
         return true;
      } catch (NumberFormatException e) {
         return false;
      }
   }
      
      private boolean analiza(String text)
      {
        if(text.equals("+"))
        {
            calculadora.setDecimal(false);
            calculadora.addAccion(Accion.ACCION_SUMA);
        }
        else if(text.equals("-"))
        {
            calculadora.setDecimal(false);
            calculadora.addAccion(Accion.ACCION_RESTA);
        }
        else if(text.equals("/"))
        {
            calculadora.setDecimal(false);
            calculadora.addAccion(Accion.ACCION_DIVISION);
        }
        else if(text.equals("*"))
        {
            calculadora.setDecimal(false);
            calculadora.addAccion(Accion.ACCION_MULTIPLICA);
        }
        else if(text.equals("="))
        {
            calculadora.setDecimal(false);
            calculadora.ejecutaAccion();
            calculadora.setAccion(Accion.ACCION_IGUAL);
        }
        else if(text.equals(".") || text.equals(","))
        {
            if(!calculadora.getDecimal())
            {
                if(calculadora.getAccion() != null && calculadora.getAccion().equals(Accion.ACCION_IGUAL))
                {
                    calculadora.setAccion(null);
                    calculadora.reseteaEntrada(text);
                }
                calculadora.setDecimal(true);
                return true;
            }
        }
        else if (test(text) || text.length() == 0) {
            if(calculadora.getAccion() != null && calculadora.getAccion().equals(Accion.ACCION_IGUAL))
            {
                calculadora.setAccion(null);
                calculadora.reseteaEntrada(text);
            }
            return true;
        }
        return false;
    }
      
    @Override
    public void insertString(FilterBypass fb, int offset, String string,
         AttributeSet attr) throws BadLocationException {
    Document doc = fb.getDocument();
      StringBuilder sb = new StringBuilder();
      sb.append(doc.getText(0, doc.getLength()));
      sb.insert(offset, string);


      boolean bResultado = analiza(string);

      if (bResultado && (test(sb.toString()) || sb.toString().length() == 0)) {
         super.insertString(fb, offset, string, attr);
      }       
      else if(bResultado && (string.equals(".") || string.equals(",")))
      {
          super.insertString(fb, offset, ".", attr);
      }
   }

   @Override
   public void replace(FilterBypass fb, int offset, int length, String text,
         AttributeSet attrs) throws BadLocationException {

      Document doc = fb.getDocument();
      StringBuilder sb = new StringBuilder();
      sb.append(doc.getText(0, doc.getLength()));
      sb.replace(offset, offset + length, text);

      boolean bResultado = analiza(text);


      if (bResultado && (test(sb.toString()) || sb.toString().length() == 0)) {
         super.replace(fb, offset, length, text, attrs);
      } 
      else if(bResultado && (text.equals(".") || text.equals(",")))
      {
          super.replace(fb, offset, length, ".", attrs);
      }
   }


   @Override
   public void remove(FilterBypass fb, int offset, int length)
         throws BadLocationException {
      Document doc = fb.getDocument();
      StringBuilder sb = new StringBuilder();
      sb.append(doc.getText(0, doc.getLength()));
      sb.delete(offset, offset + length);

      super.remove(fb, offset, length);



   }
}
