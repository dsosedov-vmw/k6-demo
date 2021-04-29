package com.dsosedov.k6demoapi.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class HomeController {

    @GetMapping(value = "/fast", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public String getFast() {
        return getData();
    }

    @GetMapping(value = "/slow", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public String getSlow() throws InterruptedException {
        Thread.sleep(5000);
        return getData();
    }

    @GetMapping(value = "/random", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public String getRandom() throws InterruptedException {
        Random random = new Random();
        Integer seconds = random.nextInt(6);
        if (seconds > 0) {
            Thread.sleep(seconds * 1000);
        }
        return getData();
    }

    private String getData() {
        return "{\"foo\":\"bar\"}";
    }

}
