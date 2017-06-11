'use strict';

var service = require('./utils');

describe('Utils Service:', function() {

  describe('service.reorder', function() {

    it('should reorder with 163841689525773', function () {
        let packets = '163841689525773';
        const result = service.reorder(packets.split(''));
        expect(result.join('')).to.equal('112334556677889');
    });

    it('should reorder with empty', function() {
      const result = service.reorder();
      expect(result).to.be.instanceOf(Array);
      expect(result.join('')).to.equal('');
    });

    it('should reorder with string', function() {
      const result = service.reorder('89U89Y28');
      expect(result).to.be.instanceOf(Array);
      expect(result.join('')).to.equal('288899UY');
    });

  });

  describe('service.formatData', function() {

    it('should formatData with array of objects', function () {
        let packets = [{values: [9,1], total:10}, {values: [8,2], total:10}, {values: [1], total:1}];
        const result = service.formatData(packets);
        expect(result).to.be.instanceOf(Array);      
        expect(result.join('')).to.equal('91821');
    });

    it('should formatData with empty', function () {
        const result = service.formatData();
        expect(result).to.be.instanceOf(Array);        
        expect(result.join('')).to.equal('');
    });

    it('should formatData with string', function () {
        let packets = '163841689525773';
        const result = service.formatData(packets);
        expect(result).to.be.instanceOf(Array);        
        expect(result.join('')).to.equal('');
    });

  });

  describe('service.optimiz', function() {
    
    it('should optimiz with array', function () {
        let packets = '16384AZ1A689525773';
        const result = service.optimiz(packets.split(''));
        expect(result).to.be.instanceOf(Array);      
    });

    it('should optimiz with array orderer ASC', function () {
        let packets = '112334556677889';
        const result = service.optimiz(packets.split(''));
        expect(result).to.be.instanceOf(Array);      
        expect(result.length).to.equal(8);
    });

    it('should optimiz with empty', function () {
        const result = service.optimiz();
        expect(result).to.be.instanceOf(Array);
        expect(result.length).to.equal(0);
    });

    it('should optimiz with string', function () {
        let packets = '16384AZ1A689525773';
        const result = service.optimiz(packets);
        expect(result).to.be.instanceOf(Array); 
        expect(result.length).to.equal(0);             
    });

  });

});