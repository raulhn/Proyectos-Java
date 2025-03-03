/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.calculadora;

import java.awt.Dimension;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.BoxLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.text.PlainDocument;

/**
 *
 * @author Usuario
 */
public class Calculadora extends JFrame{
    
    private static final String MENSAJE_ERROR = "Error";
    private JPanel panelPrincipal;
    
    private JTextField campoEntrada = new JTextField("", 30);
    private JTextField campoAlmacenado = new JTextField("", 30);
    
    private String valorAlmacenado = "";
    private boolean bDecimal = false;
    private Accion accionSeleccionada = null;
    
    private Teclado teclado;
    
    public void addAccion(Accion accion)
    {
        limpiaMensajeError();

        if(!this.valorAlmacenado.equals(""))
        {
            ejecutaAccion();
        }
        else
        {
            this.valorAlmacenado = this.campoEntrada.getText();
            this.campoAlmacenado.setText(this.valorAlmacenado);
        }
        this.campoEntrada.setText("");
        this.bDecimal = false;
        this.accionSeleccionada = accion;
   
    }
    
    
    private void limpiaMensajeError()
    {
        if(this.campoEntrada.equals(this.MENSAJE_ERROR))
        {
            this.campoEntrada.setText("");
            this.bDecimal = false;
        }
    }
    

    
    public void ejecutaAccion()
    {
        try
        {
            if(this.accionSeleccionada != null && !this.campoEntrada.getText().equals("") && !this.valorAlmacenado.equals(""))
            {
                Float valorUno = Float.parseFloat(this.valorAlmacenado);
                Float valorDos = Float.parseFloat(this.campoEntrada.getText());

                Float resultado = null;

                switch (this.accionSeleccionada)
                {
                    case Accion.ACCION_SUMA:
                       resultado = valorUno + valorDos;
                       break;
                    case Accion.ACCION_RESTA:
                        resultado = valorUno - valorDos;
                        break;
                    case Accion.ACCION_DIVISION:
                        resultado = valorUno / valorDos;
                        break;
                    case Accion.ACCION_MULTIPLICA:
                        resultado = valorUno * valorDos;
                        break;
                }

                if(resultado != null)
                {
                    this.valorAlmacenado = resultado.toString();
                    this.campoAlmacenado.setText(valorAlmacenado);
                    this.campoEntrada.setText(valorAlmacenado);
                }
            }  
        }
        catch(Exception e)
        {
            this.campoEntrada.setText(this.MENSAJE_ERROR);
        }
    }

    public void addNumero(String numero)
    {
        if(this.accionSeleccionada == Accion.ACCION_IGUAL)
        {
            this.campoEntrada.setText("");
            this.campoAlmacenado.setText("");
            this.valorAlmacenado = "";
            this.accionSeleccionada = null;
        }
        limpiaMensajeError(); 
        this.campoEntrada.setText(this.campoEntrada.getText() + numero);
    }
    
    public void addDecimal()
    {
        limpiaMensajeError(); 
        if(!this.campoEntrada.getText().contains(".")) 
        {
            this.bDecimal = true;
            if(this.campoEntrada.getText().equals(""))
            {
                this.campoEntrada.setText("0");
            }
            this.campoEntrada.setText(this.campoEntrada.getText() + ".");
        } 
    }
    
    public void setDecimal(boolean bDecimal)
    {
        this.bDecimal = bDecimal;
    }
    
    public boolean getDecimal()
    {
        return this.bDecimal;
    }
    
    private JPanel crearPanelBotones()
    {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
         
        JPanel panelBotones = new JPanel();
        panelBotones.setLayout(new BoxLayout(panelBotones, BoxLayout.X_AXIS));
        
        JPanel primeraColumna = new JPanel();
        JPanel segundaColumna = new JPanel();
        JPanel terceraColumna = new JPanel();
        JPanel cuartaColumna = new JPanel();
        JPanel quintaColumna = new JPanel();
        
        primeraColumna.setLayout(new BoxLayout(primeraColumna, BoxLayout.Y_AXIS));
        segundaColumna.setLayout(new BoxLayout(segundaColumna, BoxLayout.Y_AXIS));
        terceraColumna.setLayout(new BoxLayout(terceraColumna, BoxLayout.Y_AXIS));
        cuartaColumna.setLayout(new BoxLayout(cuartaColumna, BoxLayout.Y_AXIS));
        quintaColumna.setLayout(new BoxLayout(quintaColumna, BoxLayout.Y_AXIS));
        
        panelBotones.add(primeraColumna);
        panelBotones.add(segundaColumna);
        panelBotones.add(terceraColumna);
        panelBotones.add(cuartaColumna);
        panelBotones.add(quintaColumna);
        
        JButton botonUno = new JButton("1");
        JButton botonDos = new JButton("2");
        JButton botonTres = new JButton("3");
        JButton botonCuatro = new JButton("4");
        JButton botonCinco = new JButton("5");
        JButton botonSeis = new JButton("6");
        JButton botonSiete = new JButton("7");
        JButton botonOcho = new JButton("8");
        JButton botonNueve = new JButton("9");
        JButton botonCero = new JButton("0");
        
        JButton botonDecimal = new JButton(",");
        JButton botonIgual = new JButton("=");
        JButton botonDivision = new JButton("/");
        JButton botonMultiplica = new JButton("*");
        JButton botonSuma = new JButton("+");
        JButton botonResta = new JButton("-");
        JButton botonBorrar = new JButton("C");
        
        botonUno.addActionListener((e) -> {addNumero("1");});
        botonDos.addActionListener((e) -> {addNumero("2");});
        botonTres.addActionListener((e) -> {addNumero("3");});
        botonCuatro.addActionListener((e) -> {addNumero("4");});
        botonCinco.addActionListener((e) -> {addNumero("5");});
        botonSeis.addActionListener((e) -> {addNumero("6");});
        botonSiete.addActionListener((e) -> {addNumero("7");});
        botonOcho.addActionListener((e) -> {addNumero("8");});
        botonNueve.addActionListener((e) -> {addNumero("9");});
        botonCero.addActionListener((e) -> {addNumero("0");});
        botonDecimal.addActionListener((e) -> {addDecimal();});
        
        botonBorrar.addActionListener((e) -> {campoEntrada.setText(""); campoAlmacenado.setText(""); valorAlmacenado=""; bDecimal=false;}); 
        
        botonSuma.addActionListener((e) -> {addAccion(Accion.ACCION_SUMA);});
        botonResta.addActionListener((e) -> {addAccion(Accion.ACCION_RESTA);});
        botonDivision.addActionListener((e) -> {addAccion(Accion.ACCION_DIVISION);});
        botonMultiplica.addActionListener((e) -> {addAccion(Accion.ACCION_MULTIPLICA);});
        
        botonIgual.addActionListener((e) -> {ejecutaAccion(); this.accionSeleccionada = Accion.ACCION_IGUAL;});
        
        primeraColumna.add(botonSiete);
        primeraColumna.add(botonCuatro);
        primeraColumna.add(botonUno);
        primeraColumna.add(botonDecimal);
        
        segundaColumna.add(botonOcho);
        segundaColumna.add(botonCinco);
        segundaColumna.add(botonDos);
        segundaColumna.add(botonCero);
        
        terceraColumna.add(botonNueve);
        terceraColumna.add(botonSeis);
        terceraColumna.add(botonTres);
        terceraColumna.add(botonIgual);
        
        cuartaColumna.add(botonDivision);
        cuartaColumna.add(botonMultiplica);
        cuartaColumna.add(botonSuma);
        cuartaColumna.add(botonResta);
        
        quintaColumna.add((botonBorrar));
        
        return panelBotones;
    }
    
    
    public Calculadora()
    {
        this.campoEntrada.setHorizontalAlignment(SwingConstants.RIGHT);
        this.campoEntrada.setEnabled(true);
        
        this.campoAlmacenado.setHorizontalAlignment(SwingConstants.RIGHT);
        this.campoAlmacenado.setEnabled(false);
        
        this.panelPrincipal = new JPanel();
        this.panelPrincipal.setLayout(new BoxLayout(this.panelPrincipal, BoxLayout.Y_AXIS));
        
        JPanel panelEntrada = new JPanel();
        panelEntrada.setLayout(new BoxLayout(panelEntrada, BoxLayout.Y_AXIS));
        
        this.panelPrincipal.add(panelEntrada);
        this.panelPrincipal.add(crearPanelBotones());
        
        panelEntrada.add(this.campoAlmacenado);
        panelEntrada.add(this.campoEntrada);

        this.panelPrincipal.setPreferredSize(new Dimension(400, 700));
        getContentPane().add(this.panelPrincipal);
        setVisible(true);
             
        FiltroEntrada filtroEntrada = new FiltroEntrada(this);
        Teclado teclado = new Teclado(this);
        
        PlainDocument doc = (PlainDocument) campoEntrada.getDocument();
        doc.setDocumentFilter(filtroEntrada);

        campoEntrada.addKeyListener(teclado);
        pack();
    }

    public void setAccion(Accion accion) 
    {
        this.accionSeleccionada = accion;
    }
  
    public Accion getAccion()
    {
        return this.accionSeleccionada;
    }
    
    public void reseteaEntrada(String texto)
    {
        this.campoEntrada.setText(texto);
        this.campoAlmacenado.setText("");
        this.valorAlmacenado = "";
    }
    
}
