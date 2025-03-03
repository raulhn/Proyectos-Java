/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.calculadora;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class Teclado implements KeyListener{
    
    private Calculadora calculadora;
    
    public Teclado(Calculadora calculadora)
    {
        this.calculadora = calculadora;
    }

    @Override
    public void keyTyped(KeyEvent e) {
        
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if(e.getKeyCode() == KeyEvent.VK_ENTER)
        {
            calculadora.ejecutaAccion();
            calculadora.setAccion(Accion.ACCION_IGUAL);
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {

    }
}
